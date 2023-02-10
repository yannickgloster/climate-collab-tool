import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {};

function enable_features() {
  const workingFeatures = [];

  for (let i = 3000; i < 100000; i++) {
    // `https://ap2.challengermode.com/api/page/page/toggle_feature?pageId=7c48633e-d657-4fe0-56ee-08db084f615b&feature=${i}&active=true`
    fetch(
      `https://ap2.challengermode.com/api/page/page/toggle_feature?pageId=7c48633e-d657-4fe0-56ee-08db084f615b&feature=${i}&active=true`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          authorization:
            "Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiSldULUFFUy1LRVkiLCJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QifQ.DvIyn4F19x6sI_FMFy5c-6ceSFm1mL0sXY6gT7wlbABRhiwGI2sK9E-N08MfcN3e6Dx-UYgbuAhDm9ornYgmLEh7wOfBW2Ho.b_JOLfkpntvcDwd7bG06Yw.qRaUmDtpSc5HjItQDTy4Zi7QHKn6QhQkWmXx6JUDh8H0l1TLQqGOXPCCDTfM7_j5t-sHCTIvV2kYti2GiLqYcRS949NMB8YRLT-mk2fLw3MA76GqE5-598thOLRouMx0jFjk73zBZC2oWSEStG0Z0VhULzMMQ0gBD_eY5Ncvz7k9aflBE6mQVIjgZvJvhwurbDkGDVCqHi0rWE5hZKW0u_atm7m16zjp_roka8YVguZViNt7PxjQlcaDJ7Lgyk2OYIMZH54aTeKqvjuEuLHDxFvwV7FO8KOJUAVghG5Kzu1I5gC5wh0pzbtskKhQjceXywtu87sx6oCQImd_ihQtXYGI5sVi7CJB3E9EpPogTUJFcnikraEjjTnR39UTfTe4ddWKlJo5qYpPVnfLIsjJArnkmMhCd53doICwn4d5bQ2orFuMkr7x6OVkmR0ekdYYhGyFPIdAkegtXrr_YP1hYAwGbCB3Xt0LcS3Bt9ULIilRJn1OsyRdYs91gDRnJ3LT0MhF90UjA9bdQo7HiWrhxdXhe00yDuMI3pR_nnkAU6gtVlsxs7I1caFjBLvq_Mck4ncF78aOxmgnOiI3hwhyEbnHnlKtpux8M_OcdGMjf99n90Vl78GNME6qAKkoVJGoZAZptKV1fBcgqkTwZnpImmmsi7Ng_Omz4jO6RidxUwJOe08O5keHOscKXPkZrzHXReUTa92Xmqmz-1VIl-MxROO2aRkqQzibxTxbBe6TjX1WdyvWFgeHrTdif1XTaNKhV0mFufv6jMJRLFDrqXwvDvJIEEAq7vsRmJpj9vBA8T195z1dmo8bmJV70fs83L_4lWch8odqWNzLE-GYhPDrvOqVwS0zvp5ky3HgSlJsUPUvvXbHP05slKGcdcAAbToHp4wlZJxxCtDnnJOU9C7ll0WEoCn1QXEEGKECdDYZzPphcDgFOEAUTPaHiTJ_OlzZhqpruaRSdzv_H21I5XlK1nRFcMV826gvvmAVUa8OCviC3A0_RG2ntBuCpJAHMSOMUOQqF_8A68wNFhvdlKSKyaESlFuCNZO4STTiTJPFibCQS8Ku59S8CBMihapxkvt9usjYwE5BQnpo1H3dX5AEZFu5ytsIVOAPbnygePFDmQSQayqawl_t-qqQVWbJUtHuK3HbcFq3D2ffWlgSEtz3mHQG98p3jzeIUWfisjDniL_awsBocJZzGiiOjZfG0X0wNHly4yIlGCXnkFnQfyZF3wfwCR_OTR3CRXQYdCMAextWT7G5mRpGF6ThweDCrzzvdbF20e4fr5L5emdtR5zHi4RnkXGfOM2OhjnoKRrzD0I1nfSm_PX4lHxpFVq_UOfIm2zlCCnTvBoB3V9Q94_v_P4hiOXeGVVnSXNxVVYNr6SqLla5HYrvofex5MAlC39fOB3am698L5IEjdAHrpcNYgHkpraHVFvJZo4MgGQ9odf6kPlvVmT98LJ3EA5nLrH2VGw_Ni_9V6gz6Zi5rxODeyfyP-sAHRQzeRXENCyFJvMicMxxinjQ4RsrXRav051225usXEtYkrmV0g-W-CnYUnQiaJqifyDUf6MITgi5Q11dlrjwGU1kDxYapi2wlr7FrQemOide38oJJirZEnUmgqOrZU3on8jA4h5PFIowV56y6o4S_bdqbVHRrcYx2LSmBerSdgSMqcV1mdVOLayWcsQh2afNTEA27iqU93ZPJuOComiN2ovsOvdyv8JQpB5S8a9VSYskPaLhv8nbdfmvlTyLwkq883S06pywlr-GyB7CB1oLMs5RRY9v8_nlS2lTeKtBu1uENmOhmxCuiQTMiQ48UCPuOD_rZbh8zhYRpxpyIVXQhyM1AwFV2FAV7XywPyFTZ-NjhY30x6NKrJyVQlb6T9AVyCX6GDIB5MrJsujlsW_ziRp0C5pFzmlxfBVsh9bJkxrEG3XHzHOe0Hkzk5ynjJi0SfxopP7pJg1gcwI.2_7sUndKYmhN24FWNgHBKwjmFfqPx5TNMjEEgD6VRUU",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://www.challengermode.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((resp) => {
        workingFeatures.push[i];
      })
      .catch((e) => {});
  }

  return workingFeatures;
}
