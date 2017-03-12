require('dotenv').config()
module.exports  = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key.replace(/\\\\/g,"'\'"),
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_urlv


  // "type": "service_account",
  // "project_id": "crows-755fd",
  // "private_key_id": "d64856e985ca1c734a3c799530da6bdbf5bef5eb",
  // "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqYQIFybxx4i77\nmLzmGF06NVxd2TOQq3S/nRaCeQCeexuRrcSI79uO1D6p/6N+Zvl++x/Oog0ftNIW\nUoAkZD1B4OErXXnU5YAShcEpOoN/dMQ9x7kFGtGibS190CLH0WhRkbqqV6QgZn2D\nFsSj4Fxkf4zDwyPNunO6GPEfiP84OsUUqdbLunLeIDSB7sqdoolHfqac/U/CmTPO\n8lUsU5ru8RBl7x0JAQdFWFHy+8+GzTHOwodNbojSex+0SOA4CKM82J1CJEFBzq3p\nMJMosXmk9Y61GxJrRYds9VaD1PkJt80GUinMrdZdyJgUoUTVgM80VvFukzG4/u38\nWnd9nFkFAgMBAAECggEALC4PejS/msBN8ou+n+O9ePSRSPyjdGYhVfaD+b0qve2q\nTnJCvkeEJVtADJDvcj19gMHZk5lN0eTvfT5TYBxmDgkkGjyY9O218heg6PH1Wz2K\nDYMWpQ45QecRnsgz3KCeblhdkQI82vH4pd9nih8Jlj3E4JZfWF961szU6Zp6o7ed\nGzywn1sGnPqtE6Do0dJfJXTbjQdvVH0T5eiCt0uZhVnP5LHf2416tZzdt3jQJ+cv\n5set4Epj6unIn4KwMaD0WUnKkwfddl/KA5kWoiIvMG4kN85E9HU8ejT8ok5nR8f+\nkYt29X44D833uxub1GlWtGCh1d5AN64tsZY1HFf52QKBgQDc+2+0qi+RWKXXMGSG\nylgGj/UsepwG+yAS+leiEAzlhX+MssAuxxEGWQtO28AGpGwexB5BR9Xn+mT5hbcP\n22jBvdZsqDicPxxrnc2GpnZGFvUp9JVfq2vtijY9dAQE/10F1p/t2R1neIvyFPpL\nMNkKZUfxTFZfDIkeajnq/wfYAwKBgQDFYMEzVWYI1rbr6Tx3i2rLJd3hoGwBKlkY\nlzJbI4hJHdTb2P9wsQfNDkq7gDj9BosEEXy0iGjAVrCnaalZOtVb36C6GCa/s1mG\ne+gup+EZEAuXbbjvW0dnlHN+Ta8gHYbw3FStpCDYQPJrWlF0/PGYrNfFrWYY7xFf\nYGq+h3tQVwKBgFnkAd2o+O6T8+okKlBWURZiSuZL/dotHy/5G9q10rku4+K0985P\nddJyOFJcu7E4Ay9EsdX2RcI2rgp+ZSgTJXriIS5UA6szVPlF2Mv0PNpoDlSBxJ2F\nGsMm3MeEwPnTcuCkHKxhDEAB3lOcSvB5L2C2MFyso9nIPKLdrS+1jFhHAoGAXQT6\nSF0I10WJs6iZ7KTx0YepB/p4rBvvHV20R6t5QSwj8vBTgiKMUKFZqwAE24pH3cT4\nBoT7CRpR6rQrMXg+sSu1Lb7QFCxMFssyYzqPJSagr97v9y4HetNFktK9o98Gh2Dv\nL15YdFI3bUyFcyL6IT/j+K99nGaew1pHND/ZZ8UCgYAWRISMs1IMl8YlWCr7kekW\nspthlIQCJWU5Mvx0aVtYim1pidMUYNtTvn23P/Sm0gV3fT3t21xIMA0DV6BFXg9a\nFnM3kyeilgxo059EcvRHTWFLk3MrqT/yZq23ZSCwzClvXoOzLqvrAy1URUSjc2rE\nWrk3v5ZiujtLJC9iY/LiXg==\n-----END PRIVATE KEY-----\n",
  // "client_email": "firebase-adminsdk-4y7c7@crows-755fd.iam.gserviceaccount.com",
  // "client_id": "100791610676808335744",
  // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  // "token_uri": "https://accounts.google.com/o/oauth2/token",
  // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4y7c7%40crows-755fd.iam.gserviceaccount.com"
}