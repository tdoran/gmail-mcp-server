const standardEmail = {
  id: "19b3836a4ec0b618",
  threadId: "19b3836a4ec0b618",
  labelIds: ["CATEGORY_PROMOTIONS", "UNREAD", "INBOX"],
  snippet:
    "Add three people when you upgrade to a family subscription, with four separate logins for individual control over games, recipes and more. ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ View in browser The New York Times |",
  payload: {
    partId: "",
    mimeType: "multipart/mixed",
    filename: "",
    headers: [
      {
        name: "Delivered-To",
        value: "t.g.doran1@gmail.com",
      },
      {
        name: "Received",
        value:
          "by 2002:a05:6022:3403:b0:e7:d146:ca6 with SMTP id by3csp442910lab;        Fri, 19 Dec 2025 12:04:24 -0800 (PST)",
      },
      {
        name: "X-Google-Smtp-Source",
        value:
          "AGHT+IEv20mb6okF+1BZHbUB/ghV9xhFrOLvFLlGVstxWQiCF4OzJlt+Y015V9QQocrlg/+DcZ/3",
      },
      {
        name: "X-Received",
        value:
          "by 2002:a05:7300:e50f:b0:2ae:5e6e:bcbe with SMTP id 5a478bee46e88-2b05ea1b956mr3372252eec.0.1766174663838;        Fri, 19 Dec 2025 12:04:23 -0800 (PST)",
      },
      {
        name: "ARC-Seal",
        value:
          "i=1; a=rsa-sha256; t=1766174663; cv=none;        d=google.com; s=arc-20240605;        b=VWA68sF/w624lekciSDtK6gjKVPxb+X748brjRLJwD5rQmh42a8dujLJASEH/mYZBE         ZpE9Kaz6vnJ39IV3T+LroFtXKdCmykvrne7ERMhxV7zzs+mDqXPIRlPUgNTboAvco4Bc         0pJ3mqAOv6pJdWgZVKHasCXtGxUSi87aZx6GfG6lqPhAf5zDn5GoEZ05dY/RCY5MIpmY         cmP49v9EnPAojx7e2nH5xBbQp2rZ4SMbGd10XPhPbKaHCk2rYmlH6UzWS59p8bte6iRz         31t+AwG/VTG18dZDBwbJeqI1v/JigqKgl+tjn6v6KaQovGk36uJxcvtNiAz1T3OTrXbV         GJew==",
      },
      {
        name: "ARC-Message-Signature",
        value:
          "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;        h=message-id:list-unsubscribe-post:list-unsubscribe:feedback-id         :subject:reply-to:from:to:date:mime-version:dkim-signature;        bh=4H1HNZpw4jR4k5hOB4ukJQOUw5BPsKyGKUGNjokNcEo=;        fh=0I9XVTBAPPcCKxeQVQpu5D1Vb1QlGH+DZHfDb9YNKpo=;        b=NuYhGOKj4WlumnXC2Q2SKIHj1gGjORaVkOv/z/Rpe5rpPV7E9M+YReEK05JnHJFQhU         m8aCb57zgyLl706zR5QlQ6MyISAL3k1IwelCjo25qj0m6XWKu813soLZSOYGNzS4RZEJ         QFSxGBhiyRyASHhWeciEva2m7rEMf0LCqg7/rjohk2WswTKnLzzX//ll0wMtoRJs6QPz         k63Z7eMspfEk31K62pGlFVP7MuA4Rbfk60Mzai1e1v+dh2u8X7tIYkWb/NCjWQzJ4jGz         1wr2ezCLd2XeyhBMlweiEsCfbkpFsD5CbLzyS0yeDf++djporBR6DjbjGtBWYfSZ2pNp         uMUg==;        dara=google.com",
      },
      {
        name: "ARC-Authentication-Results",
        value:
          "i=1; mx.google.com;       dkim=pass header.i=@e.newyorktimes.com header.s=nyt-20250429 header.b=h9+gspHq;       spf=pass (google.com: domain of nytimes@e.newyorktimes.com designates 207.135.2.56 as permitted sender) smtp.mailfrom=nytimes@e.newyorktimes.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=e.newyorktimes.com",
      },
      {
        name: "Return-Path",
        value: "<nytimes@e.newyorktimes.com>",
      },
      {
        name: "Received",
        value:
          "from omp.e.newyorktimes.com (omp.e.newyorktimes.com. [207.135.2.56])        by mx.google.com with ESMTPS id 5a478bee46e88-2b060045632si14054038eec.79.2025.12.19.12.04.23        for <t.g.doran1@gmail.com>        (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);        Fri, 19 Dec 2025 12:04:23 -0800 (PST)",
      },
      {
        name: "Received-SPF",
        value:
          "pass (google.com: domain of nytimes@e.newyorktimes.com designates 207.135.2.56 as permitted sender) client-ip=207.135.2.56;",
      },
      {
        name: "Authentication-Results",
        value:
          "mx.google.com;       dkim=pass header.i=@e.newyorktimes.com header.s=nyt-20250429 header.b=h9+gspHq;       spf=pass (google.com: domain of nytimes@e.newyorktimes.com designates 207.135.2.56 as permitted sender) smtp.mailfrom=nytimes@e.newyorktimes.com;       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=e.newyorktimes.com",
      },
      {
        name: "DKIM-Signature",
        value:
          "v=1; a=rsa-sha256; c=relaxed/relaxed; s=nyt-20250429; d=e.newyorktimes.com; h=MIME-Version:Content-Type:Date:To:From:Reply-To:Subject:Feedback-ID: List-Unsubscribe:List-Unsubscribe-Post:Message-ID; i=nytimes@e.newyorktimes.com; bh=4H1HNZpw4jR4k5hOB4ukJQOUw5BPsKyGKUGNjokNcEo=; b=h9+gspHq7Hcsz1FMGo4KAwGdt9jfNdo5yYcZF86QJ15gFZnL/cIoxnGTPEhhuF9CVp0eD1UFfqQF   S1dsF5vaRBS1Akg38pkBuno5PpJwq04+cfAKDRfcsoWDpkcGu/z43W3F3sCoA8da54tPEw6SMf6y   s8ep2c5nPx+JlbnNvErdJPqcBELKcnWsbMjBCVvTxYgS4E6q33gRCDWFJy6tiqNX2c11DStlDbIG   RfXYFhtDskiECnoZaLWJCXbBjbuwR4kGj/Wi2jzt2HIOxHhqi+ke2DAy9XMatfW0yEyTbG9yT/vJ   FLq9l32la+DL9DGicF2JfGSChpl22nHVfGkNxQ==",
      },
      {
        name: "MIME-Version",
        value: "1.0",
      },
      {
        name: "Content-Type",
        value: 'multipart/mixed; boundary="----msg_border_pyfQOj1mY8"',
      },
      {
        name: "Date",
        value: "Fri, 19 Dec 2025 20:04:18 +0000",
      },
      {
        name: "To",
        value: "t.g.doran1@gmail.com",
      },
      {
        name: "From",
        value: "The New York Times <nytimes@e.newyorktimes.com>",
      },
      {
        name: "Reply-To",
        value: "The New York Times <reply@e.newyorktimes.com>",
      },
      {
        name: "Subject",
        value: "Enjoy more with a family subscription.",
      },
      {
        name: "Feedback-ID",
        value: "80634:137679325:oraclersys",
      },
      {
        name: "List-Unsubscribe",
        value:
          "<mailto:unsubscribe-BQjkPkSUAQGzaF7F0KflEwlBhvFJjgFPKLUN8zdzcoR1SzbLgvngNM6qS9d40gMmzgOfRU4a0IEb7zcK4n@imh.rsys136.origin.responsys.ocs.oraclecloud.com?subject=List-Unsubscribe>, <https://e.newyorktimes.com/pub/optout/UnsubscribeOneStepConfirmAction?YES=true&_ri_=X0Gzc2X%3DBQjkPkSUAQGzaF7F0KflEwlBhvFJjgFPKLUN8zdzcoR1SzbLgvngNM6qS9d40gMmzgOfRU4a0IEb7zcK4n&_ei_=EUlaGGF4SNMvxFF7KucKuWN0i_wKjMUEozgy2Vh_ua2bPUIJkdgE9CYf5xSwXQobo7PtA473t5knL3k.>",
      },
      {
        name: "List-Unsubscribe-Post",
        value: "List-Unsubscribe=One-Click",
      },
      {
        name: "X-sgxh1",
        value: "lQnQKhjHgSxnuHptQJhu",
      },
      {
        name: "X-rext",
        value:
          "7.rsys136.EQzBzRdMtGOt7oNzcrnzyde3vCZXh0S1qenNgnvfA-1DKWRnfuFwM03WHRbGIBXdWg",
      },
      {
        name: "X-cid",
        value: "nyt.10719805",
      },
      {
        name: "X-ei",
        value: "EV56ZFSFqe6yd0CzQ-dgEGF0yi5GSYA",
      },
      {
        name: "X-cp",
        value:
          "EDBMlYiAnGzmXv-hUMcA5p-sB0Elj6tey9oATwElAdLjH97dnoDwQ8Ed1OrhROk",
      },
      {
        name: "Message-ID",
        value: "<0.2.8.263.1DC7122A876E534.0@omp.e.newyorktimes.com>",
      },
    ],
    body: {
      size: 0,
    },
    parts: [
      {
        partId: "0",
        mimeType: "multipart/alternative",
        filename: "",
        headers: [
          {
            name: "Date",
            value: "Fri, 19 Dec 2025 20:04:18 +0000",
          },
          {
            name: "Content-Type",
            value:
              'multipart/alternative; boundary="----alt_border_ZdlN5hPmhC_1"',
          },
        ],
        body: {
          size: 0,
        },
        parts: [
          {
            partId: "0.0",
            mimeType: "text/plain",
            filename: "",
            headers: [
              {
                name: "Content-Type",
                value: 'text/plain; charset="UTF-8"',
              },
              {
                name: "Content-Transfer-Encoding",
                value: "quoted-printable",
              },
            ],
            body: {
              size: 2712,
              data: "QWRkIHRocmVlIHBlb3BsZSB3aGVuIHlvdSB1cGdyYWRlIHRvIGEgZmFtaWx5IHN1YnNjcmlwdGlvbiwgd2l0aCBmb3VyIHNlcGFyYXRlIGxvZ2lucyBmb3IgaW5kaXZpZHVhbCBjb250cm9sIG92ZXIgZ2FtZXMsIHJlY2lwZXMgYW5kIG1vcmUuDQoNCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tDQoNCi0tIFRoZSBOZXcgWW9yayBUaW1lcyAtLQ0KDQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQ0KDQpUaGUgTmV3IFlvcmsgVGltZXMgfCBJbnRyb2R1Y2luZyBvdXIgRmFtaWx5IFN1YnNjcmlwdGlvbi4NCg0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0NCg0KQ2xpY2sgaGVyZSB0byB2aWV3IGVtYWlsIHdpdGggaW1hZ2VzOg0KIGh0dHBzOi8vZS5uZXd5b3JrdGltZXMuY29tL3B1Yi9zZi9Gb3JtTGluaz9fcmlfPVgwR3pjMlglM0RCUWprUGtTVUFRR3phRjdGMEtmbEV3bEJodkZKamdGUEtMVU44emR6Y29SMVN6Ykxndm5nTk02cVM5ZDQwZ01temdPZlJVNGEwSUViN3pjSzRuVlhNdFglM0RCUWprUGtTVUFRR3plN0lOQ20yOFBm90aWNlDQoNCg0KDQoNCihjKTIwMjUgVGhlIE5ldyBZb3JrIFRpbWVzIENvbXBhbnkgfCA2MjAgRWlnaHRoIEF2ZW51ZSwgTmV3IFlvcmssIE5ZLCAxMDAxOA0K",
            },
          },
          {
            partId: "0.1",
            mimeType: "text/html",
            filename: "",
            headers: [
              {
                name: "Content-Type",
                value: 'text/html; charset="UTF-8"',
              },
              {
                name: "Content-Transfer-Encoding",
                value: "quoted-printable",
              },
            ],
            body: {
              size: 45946,
              data: "PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGQiPg0KPGh0bWwgc3R5bGU9Im9wYWNpdHk6IDE7IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgeG1sbnM6bz0idXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6b2ZmaWNlIiB4bWxuczp2PSJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOnZtbCI-DQo8aGVhZD4NCjwhLS1baWYgZ3RlIG1zbyA5XT48eG1sPg0KIDxvOk9mZmljZURvY3VtZW50U2V0dGluZ3M-DQogIDxvOkFsbG93UE5HLz4NCiAgPG86UGl4ZWxzUGVySW5jaD45NjwvbzpQaXhlbHNQZXJJbmNoPg0KIDwvbzpPZmZpY2VEb2N1bWVudFNldHRpbmdzPg0KPC94bWw-PCFbZW5kaWZdLS0-DQo8dGl0bGUgcWEtaWQ9InRpdGxlIj5FbmpveSBtb3JlIHdpdGggYSBmYW1pbHkgc3Vic2NyaXB0aW9uLjwvdGl0bGU-DQo8bGluayBocmVmPSJodHRwczovL3d3dy5ueXRpbWVzLmNvbS92aS1hc3NldHMvc3RhdGljLWFzc2V0cy9mYXZpY29uLTRiZjk2Y2I2YTEwOTM3NDhiZjViM2M0MjlhY2NiOWI0LmljbyIgcmVsPSJpY29uIi8-DQo8bWV0YSBjb250ZW50PSJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgiIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgLz4NCjxtZXRhIGh0dHAtZXF1aXY9ImNvbnRlbnQtdHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVURi04Ij4NCjxtZXRhIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xIiBuYW1lPSJ2aWV3cG9ydCI-IA0KPG1ldGEgbmFtZT0ieC1hcHBsZS1kaXNhYmxlLW1lc3NhZ2UtcmVmb3JtYXR0aW5nIj4gDQo8bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiIGNvbnRlbnQ9IklFPWVkZ2UiPiANCiAgIDxzdHlsZSB0eXBlPtZz4NCjwvdGQ-DQo8L3RyPg0KPC90YWJsZT4NCjwvYm9keT4NCjwvaHRtbD4NCg==",
            },
          },
        ],
      },
    ],
  },
  sizeEstimate: 60866,
  historyId: "9506548",
  internalDate: "1766174658000",
};

const metadataEmail = {
  id: "19b3836a4ec0b618",
  threadId: "19b3836a4ec0b618",
  labelIds: ["CATEGORY_PROMOTIONS", "UNREAD", "INBOX"],
  snippet:
    "Add three people when you upgrade to a family subscription, with four separate logins for individual control over games, recipes and more. ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ View in browser The New York Times |",
  payload: {
    mimeType: "multipart/mixed",
    headers: [
      {
        name: "Date",
        value: "Fri, 19 Dec 2025 20:04:18 +0000",
      },
      {
        name: "From",
        value: "The New York Times <nytimes@e.newyorktimes.com>",
      },
      {
        name: "Subject",
        value: "Enjoy more with a family subscription.",
      },
    ],
  },
  sizeEstimate: 60866,
  historyId: "9506548",
  internalDate: "1766174658000",
};
