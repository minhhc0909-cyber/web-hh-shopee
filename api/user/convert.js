export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, userId } = req.body || {};
    if (!url) {
      return res.status(400).json({ error: 'URL không hợp lệ' });
    }

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const rawSubId = (userId || 'USR888999').replace(/[^0-9a-zA-Z]/g, '') || 'USR888999';

    let platform = 'shopee';
    let platformName = 'Shopee VN';
    const lower = cleanUrl.toLowerCase();

    if (lower.includes('tiktok') || lower.includes('vt.tiktok')) {
      platform = 'tiktok';
      platformName = 'TikTok Shop';
    } else if (lower.includes('lazada')) {
      platform = 'lazada';
      platformName = 'Lazada VN';
    } else if (lower.includes('shopeefood')) {
      platform = 'shopee-food';
      platformName = 'ShopeeFood';
    }

    // STEP 1: Unshorten URL
    let expandedUrl = cleanUrl;
    try {
      if (cleanUrl.includes('s.shopee.vn') || cleanUrl.includes('shope.ee')) {
        const redirectRes = await fetch(cleanUrl, { method: 'GET', redirect: 'follow' });
        if (redirectRes.url) {
          expandedUrl = redirectRes.url;
        }
      }
    } catch (err) {
      console.log('[Vercel Resolve Note]:', err.message);
    }

    // STEP 2: Extract shopId & itemId
    let shopId = null;
    let itemId = null;
    const m1 = expandedUrl.match(/i\.(\d+)\.(\d+)/);
    if (m1) {
      shopId = m1[1];
      itemId = m1[2];
    } else {
      const m2 = expandedUrl.match(/\/product\/(\d+)\/(\d+)/) || expandedUrl.match(/\/(\d+)\/(\d+)/);
      if (m2) {
        shopId = m2[1];
        itemId = m2[2];
      }
    }

    // STEP 3 & 4: Call Shopee GraphQL API
    let officialShopeeLink = null;
    if (shopId && itemId && lower.includes('shopee')) {
      officialShopeeLink = await callShopeeGraphQL(shopId, itemId, rawSubId);
    }

    // Format clean expanded product link if shortlink unshortened, eliminating raw input shortlink return
    let affiliateUrl = officialShopeeLink;
    if (!affiliateUrl) {
      if (shopId && itemId) {
        affiliateUrl = `https://shopee.vn/product/${shopId}/${itemId}?sub_id1=${rawSubId}&utm_source=shopee_affiliate`;
      } else {
        const separator = cleanUrl.includes('?') ? '&' : '?';
        affiliateUrl = `${cleanUrl}${separator}sub_id1=${rawSubId}&utm_source=shopee_affiliate`;
      }
    }

    return res.status(200).json({
      originalUrl: url,
      affiliateUrl,
      resolvedUrl: expandedUrl,
      shopId,
      itemId,
      platform,
      platformName,
      subId: rawSubId,
      subId1: rawSubId,
      estimatedCashbackRate: 80,
      estimatedCashback: 25000,
      estimatedCashbackAmount: 25000
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function callShopeeGraphQL(shopId, itemId, subId1) {
  const cookie = "language=vi; SPC_F=HTnDTXY21Y6PAT7THpU1638Sl45FzFoc; REC_T_ID=a09f6c92-6323-11f1-9943-726d7301136a; _gcl_au=1.1.124912997.1780914010; SPC_CLIENTID=SFRuRFRYWTIxWTZQuraknceouoxsxnnh; _ga=GA1.1.1328299203.1780914012; _fbp=fb.1.1780914011718.571497482666654314; _hjSessionUser_868286=eyJpZCI6IjgzMDFlNzlmLTk2ZDItNTYzOC04MjRiLTBlOGFkZjU3ZWNhMiIsImNyZWF0ZWQiOjE3ODA5MTQwMTMyNjUsImV4aXN0aW5nIjp0cnVlfQ==; _QPWSDCXHZQA=e3e6d179-66e3-42d5-b89c-0876ef4ef2e8; REC7iLP4Q=10de77d8-ae0e-4b49-bf89-62e6c36e4af0; _fbc=fb.1.1784993147098.IwY2xjawTRtMNleHRuA2FlbQIxMABicmlkETE2QTRDUzBUUGp4T0FWSk5Fc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHlE1C7Q_b5MBJYQFcT75GPh-TJiWfe7r910VrJm9BdOyVF2I35a6UaKkN8YC_aem_wKiFzG7YzDgvS5fOJg4i2Q; csrftoken=8MJysI57GWuv9v184wmFzvvQj8vEz00N; SPC_EC=-; SPC_SI=43YnagAAAABmQ050OTBGMIuvYwcAAAAAN01hdmk4Zm4=; _med=affiliates; language=vi; _sapid=68e101a641ae3ecc6dbccda4eeabd2e31331442ce2c5b243651c09e5; SPC_ST=AKDJUAer6YnA731xjZHIl6le2cpW9SZhQ6Ap+ts8dG9Qye0BtWkTdXEBafvt2avRqPcgOXmU1dIVZref1P4xQf5Vx87xliw3IpW754neKjuqFtRae9l0z3WhM7UsJ24iX0tgzhMudWBT8jcCtsMiiDEs6/X85k7QsFsmJKxmRmirM1uTcm86FDSlxUi4QbWWfbfJkZ1LfSPMwI2EookmBQ==.ALbdlBtAXhIuamI30bUMst8zbJiwRqt673JtKEdnhT2C; SPC_U=112054971; SPC_R_T_ID=wkRvyG64Dp70lzM0+9rVX2Mkf4fTRritYHQpgUaUqfM3eDNeiWuYt8NVh1vimVh25W958mNiz6lMv+uaQghM1Qd4SLL9odSLh2e0Igcue4+X3wTY5PX8OrpfKM0iBaimIImuL9SFcMYoL0UkDZOfN7E09eUL2W1a8kZdnNQ9PKw=; SPC_R_T_IV=RWJ1YkhmRXNISU8yTjU0dA==; SPC_T_ID=wkRvyG64Dp70lzM0+9rVX2Mkf4fTRritYHQpgUaUqfM3eDNeiWuYt8NVh1vimVh25W958mNiz6lMv+uaQghM1Qd4SLL9odSLh2e0Igcue4+X3wTY5PX8OrpfKM0iBaimIImuL9SFcMYoL0UkDZOfN7E09eUL2W1a8kZdnNQ9PKw=; SPC_T_IV=RWJ1YkhmRXNISU8yTjU0dA==; SPC_CDS_CHAT=b86f1e5e-ba4c-499d-ae67-031dca0b2737; sense_sa_r=s";
  try {
    const gqlUrl = 'https://affiliate.shopee.vn/api/v3/gql?q=productOfferLinks';
    const gqlQuery = 'query batchGetProductOfferLink($sourceCaller: SourceCaller!, $productOfferLinkParams: [ProductOfferLinkParam!]!, $advancedLinkParams: AdvancedLinkParams) { productOfferLinks(productOfferLinkParams: $productOfferLinkParams, sourceCaller: $sourceCaller, advancedLinkParams: $advancedLinkParams) { itemId shopId productOfferLink } }';

    const payload = {
      operationName: 'batchGetProductOfferLink',
      query: gqlQuery,
      variables: {
        productOfferLinkParams: [{ itemId: String(itemId), shopId: Number(shopId) }],
        sourceCaller: 'WEB_SITE_CALLER',
        advancedLinkParams: { subId1: String(subId1), subId2: '', subId3: '', subId4: '', subId5: '' }
      }
    };

    const response = await fetch(gqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'csrf-token': 'OVdAU3Ci-qT8PE-04pheXhLIILlLiB84bUmA',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'af-ac-enc-sz-token': 'NP2QLlIzGTNiGX+WvdeHcA==|uvfuY1YRi6wuzePiq17J09BPgKnMfi3DtLfNboagLHBWViFXiOv5K7OXHQ8C+nfDbeNniPtAlfE=|7Z+ZbOcvzgotJWX0|08|3'
      },
      body: JSON.stringify(payload)
    });

    const resJson = await response.json();
    if (resJson && resJson.data && resJson.data.productOfferLinks && resJson.data.productOfferLinks.length > 0) {
      return resJson.data.productOfferLinks[0].productOfferLink;
    }
  } catch (err) {
    console.log('[Vercel GQL Note]:', err.message);
  }
  return null;
}
