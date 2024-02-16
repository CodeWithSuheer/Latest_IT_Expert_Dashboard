import nodemailer from "nodemailer";

export async function sendEmail(to, from) {
  const { email, emailType, resetToken, orderId } = to;
  let output;

  if (emailType === "RESETPASSWORD") {
    output = `
        <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <!-- <link rel="stylesheet" href="Invoice.css" /> -->
          <title>Email Verification</title>
          <style>
            body {
              margin: auto 0px;
              font-family: "Poppins", sans-serif;
            }
      
            .emailHeader {
              text-align: center;
              background-color: white;
              border-bottom: 0.5px solid black;
              width: 90%;
              margin: 0 auto;
            }
      
            .emailHeaderImg {
              width: 12rem;
              height: 8rem;
            }
      
            .emailFooter {
              border-top: 0.5px solid black;
              width: 90%;
              margin: 0 auto;
            }
            .EmailFooterText {
              text-align: center;
              padding: 0 5rem;
              color: #000000;
            }
            .socialFooter {
              display: flex;
              align-items: center;
              justify-content: space-around;
            }
            .socialEmailFooter {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .SocialFooterEmail {
              text-align: center;
              padding: 0 5rem;
            }
            .pushable {
              position: relative;
              background: transparent;
              padding: 0px;
              border: none;
              cursor: pointer;
              outline-offset: 4px;
              outline-color: deeppink;
              transition: filter 250ms;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
      
            .shadow {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background: #F11900;
              border-radius: 8px;
              filter: blur(2px);
              will-change: transform;
              transform: translateY(2px);
              transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
            }
      
            .edge {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              border-radius: 8px;
              background: linear-gradient(
                to right,
                #F11900 0%,
                #F11900 8%,
                #F11900 92%,
                #F11900 100%
              );
            }
      
            .front {
              display: block;
              position: relative;
              border-radius: 8px;
              background: #F11900;
              padding: 16px 32px;
              color: white;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              font-size: 1rem;
              transform: translateY(-4px);
              transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
            }
      
            .pushable:hover {
              filter: brightness(110%);
            }
      
            .pushable:hover .front {
              transform: translateY(-6px);
              transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
            }
      
            .pushable:active .front {
              transform: translateY(-2px);
              transition: transform 34ms;
            }
      
            .pushable:hover .shadow {
              transform: translateY(4px);
              transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
            }
      
            .pushable:active .shadow {
              transform: translateY(1px);
              transition: transform 34ms;
            }
      
            .pushable:focus:not(:focus-visible) {
              outline: none;
            }
      
            @media (max-width: 567px) {
              .EmailFooterText {
                padding-inline: 20px;
              }
            }
            @media (max-width: 567px) {
              .socialFooter {
                font-size: 10px;
              }
              .EmailFooterText {
                padding-inline: 0px;
              }
              .emailFooter {
                width: 100vw;
              }
            }
          </style>
        </head>
        <body>
          <div class="emailHeader">
            <img
              class="emailHeaderImg"
              src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/IT-Expert-Logo.png?v=1705563325"
              alt="Logo"
            />
          </div>
          <main>
            <div
              style="
                margin: 0;
                padding: 52px 30px 35px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto">
                <h1
                  style="
                    margin: 0;
                    font-size: 2rem;
                    font-weight: bold;
                    color: #1f1f1f;
                  "
                >
                  Password Reset
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 300;
                    letter-spacing: 0.56px;
                    font-size: 0.8rem;
                    color: #000000;
                  "
                >
                  If you've lost your password or wish to reset it, use the
                  <span style="font-weight: 600; color: #1f1f1f">link</span> below to
                  get started.This link will expire in 15 minutes
                </p>
                <p style="margin-top: 50px">
                  <a href="http://localhost:5173/api/user/resetPassword?t=${resetToken}" target="_blank"> <button class="pushable">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front"> Reset Password </span>
                  </button>
              </a>
                </p>
              </div>
            </div>
          </main>
          <div class="emailFooter">
            <p class="EmailFooterText">
              IT experts will not respond to this email. Contact our support team for
              assistance with any queries.
            </p>
            <p class="SocialFooterEmail">
              <img
                src="https://ci3.googleusercontent.com/meips/ADKq_NYT54kyvJiSv2utKf9welWdjYm8tedr1SFiO3RM9_3mndZDn_ISWLS6D4--8BGZ1IYbDjIQx3xbsnso8hZQeTqFfoJ931fLMDUwy_EGTI7NelmVI6ACE9FYgZXjfWTsNDcaQyOK9tlnZXlTwiK6Q_0Xy9Zz8Q-8EsuZfzQv=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/mobile-small.png"
                alt="Phone"
              />
              <span style="color: #000000">(021) 111-222-729</span> <br />
              <img
                src="https://ci3.googleusercontent.com/meips/ADKq_NaDe_LNVEsmsw3_aY3yntWcxK9HSOuptmfTTjKVJRV-6OiDTXaV8BUgLzKW2gUGFVs77xOFjL81vp5TdchXQKuH_fRU912QC5Mf-35naxuP9GUzGw9e4T2vPufRNNQ4CyEBnOXCLWlQWgAsd9xXmvpafZUc6z1sPLUiT5A=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/email-small.png"
                alt="Phone"
              />
              <span
                ><a href="mailto: support@it-experts.com"
                  >support@it-experts.com</a
                ></span
              ><br />
              <img
                src="https://ci3.googleusercontent.com/meips/ADKq_NZP5T_9C3RRkJhZ7w-WziFAUnlsIIa6EvG1HJcWgRA1iUu3ZuyXfg2YuJaGiNhd9zszqUmC7o-sJnfTnfBUFVE4Kfu9qsTpToeXLsjWGzv2oNFXRwsERTM-XZjIApEiSwuhTOXjGCb8brcSCFqwFsR1xY745rfyspuCl1QZsg=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/website-small.png"
                alt="Phone"
              />
              <span><a href="https://it-experts.com.pk/">IT-Experts.com</a></span>
            </p>
      
            <p class="EmailFooterText">
              <a
                style="margin-right: 20px"
                href="https://www.facebook.com/itexpertsofficial?mibextid=9R9pXO"
              >
                <img
                  src="https://ci3.googleusercontent.com/meips/ADKq_NaRjpJmNeiSpV8cs33d3ijU5G-d6oF87HRowar1RmJf333GSjLF3r1076KiuyHYt7kQagWtWekhcpg9F--jFejpXvOh4vcWUeuhprSZ6Pv3rxyCOXIdjwfCfhWTbTP5oQd-zbgR8o5UvH4WlHwiVkkJJ1DE_IUO5n5-dPiwJOs=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/facebook-small.png"
                  alt=""
              /></a>
              <a
                style="margin-right: 20px"
                href="https://www.instagram.com/invites/contact/?i=nnkprelmgyb8&utm_content=q12t82c"
                ><img
                  src="https://ci3.googleusercontent.com/meips/ADKq_NayTB8qCHkY-yJ9ywOuwGQtwwq26fCGnIQ6VIQ5nVd5g5feCFICK8pEb7QmE39tfaJJnpJgngybguq6OkSth5TJwWjXgduDgX_WlcLy0tj9FtjSh4Bkx2bc-WxzOtPZNIFkAIItSrO9Kbb2p-IafTtyS5f1GBw0twrJ6nE=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/insta-small.png"
                  alt=""
              /></a>
              <a href="https://pk.linkedin.com/company/it-experts-pakistan1"
                ><img
                  src="https://ci3.googleusercontent.com/meips/ADKq_NY7UperDuClEBCZO-sAKuZqwzEGW66XqnLCzBCjDv2XCDiKyQAcuozQJ4G_2ZOVKce1VzlFUAI7tQefF82hwvW_9I90PFK2uXZtSrJuJFCvpdhZqh0x-UCBN5lBrSBYjM0_Of-n3wDSCefxAv0hDnJ0kKl2RWDuy-Rb-GA1Mh0=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/linkedin-small.png"
                  alt=""
              /></a>
            </p>
          </div>
        </body>
      </html>
        `;
  } else if (emailType === "INVOICEGENERATED") {
    output = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <link rel="stylesheet" href="Invoice.css" /> -->
    <title>Email Verification</title>
    <style>
      body {
        margin: auto 0px;
        font-family: "Poppins", sans-serif;
      }

      .emailHeader {
        text-align: center;
        background-color: white;
        border-bottom: 0.5px solid black;
        width: 90%;
        margin: 0 auto;
      }

      .emailHeaderImg {
        width: 12rem;
        height: 8rem;
      }

      .emailFooter {
        border-top: 0.5px solid black;
        width: 90%;
        margin: 0 auto;
      }
      .EmailFooterText {
        text-align: center;
        padding: 0 5rem;
      }
      .socialFooter {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .socialEmailFooter {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .SocialIcons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-block: 1rem;
      }
      @media (max-width: 567px) {
        .EmailFooterText {
          padding-inline: 20px;
        }
      }
      @media (max-width: 567px) {
        .socialFooter {
          font-size: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="emailHeader">
      <img
        class="emailHeaderImg"
        src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/IT-Expert-Logo.png?v=1705563325"
        alt="Logo"
      />
    </div>
    <main>
      <div
        style="
          margin: 0;
          padding: 92px 30px 115px;
          background: #ffffff;
          border-radius: 30px;
          text-align: center;
        "
      >
        <div style="width: 100%; max-width: 489px; margin: 0 auto">
          <h1
            style="margin: 0; font-size: 3rem; font-weight: bold; color: #1f1f1f"
          >
          Invoice Generated
          </h1>
          
          <p
            style="
              margin: 0;
              margin-top: 17px;
              font-weight: 300;
              letter-spacing: 0.56px;
              font-size: 1.2rem;
            "
          >
            Thank you for choosing IT-Experts Company.An Invoice has been aginst order Id mentioned below.Please visit your profile to pay your dues.
          </p>
          <p
            style="
              margin: 0;
              margin-top: 60px;
              font-size: 40px;
              font-weight: 600;
              letter-spacing: 25px;
              color: #ba3d4f;
            "
          >
            ${orderId}
          </p>
        </div>
      </div>
    </main>
    <div class="emailFooter">
      <p class="EmailFooterText">
        IT experts will not respond to this email. Contact our support team for
        assistance with any queries.
      </p>
      <div style="display: flex; align-items: center; justify-content: space-around;">
        <div style="display: flex; align-items: center; gap: 5px;">
          <img
            src="https://ci3.googleusercontent.com/meips/ADKq_NYT54kyvJiSv2utKf9welWdjYm8tedr1SFiO3RM9_3mndZDn_ISWLS6D4--8BGZ1IYbDjIQx3xbsnso8hZQeTqFfoJ931fLMDUwy_EGTI7NelmVI6ACE9FYgZXjfWTsNDcaQyOK9tlnZXlTwiK6Q_0Xy9Zz8Q-8EsuZfzQv=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/mobile-small.png"
            alt="Phone"
          />
          <span>(021) 111-222-729</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <img
            src="https://ci3.googleusercontent.com/meips/ADKq_NaDe_LNVEsmsw3_aY3yntWcxK9HSOuptmfTTjKVJRV-6OiDTXaV8BUgLzKW2gUGFVs77xOFjL81vp5TdchXQKuH_fRU912QC5Mf-35naxuP9GUzGw9e4T2vPufRNNQ4CyEBnOXCLWlQWgAsd9xXmvpafZUc6z1sPLUiT5A=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/email-small.png"
            alt="Mail"
          />
          <a href="mailto: support@it-experts.com">support</a>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <img
            src="https://ci3.googleusercontent.com/meips/ADKq_NZP5T_9C3RRkJhZ7w-WziFAUnlsIIa6EvG1HJcWgRA1iUu3ZuyXfg2YuJaGiNhd9zszqUmC7o-sJnfTnfBUFVE4Kfu9qsTpToeXLsjWGzv2oNFXRwsERTM-XZjIApEiSwuhTOXjGCb8brcSCFqwFsR1xY745rfyspuCl1QZsg=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/website-small.png"
            alt="Website"
          />
          <a href="https://it-experts.com.pk/">IT-Experts.com</a>
        </div>
      </div>
      <div style="display: flex; justify-content: center; gap: 10px; margin-block: 1rem;">
        <a href="https://www.facebook.com/itexpertsofficial?mibextid=9R9pXO">
          <img
            src="https://ci3.googleusercontent.com/meips/ADKq_NaRjpJmNeiSpV8cs33d3ijU5G-d6oF87HRowar1RmJf333GSjLF3r1076KiuyHYt7kQagWtWekhcpg9F--jFejpXvOh4vcWUeuhprSZ6Pv3rxyCOXIdjwfCfhWTbTP5oQd-zbgR8o5UvH4WlHwiVkkJJ1DE_IUO5n5-dPiwJOs=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/facebook-small.png"
            alt=""
        /></a>
        <a
          href="https://www.instagram.com/invites/contact/?i=nnkprelmgyb8&utm_content=q12t82c"
          ><img
            src="https://ci3.googleusercontent.com/meips/ADKq_NayTB8qCHkY-yJ9ywOuwGQtwwq26fCGnIQ6VIQ5nVd5g5feCFICK8pEb7QmE39tfaJJnpJgngybguq6OkSth5TJwWjXgduDgX_WlcLy0tj9FtjSh4Bkx2bc-WxzOtPZNIFkAIItSrO9Kbb2p-IafTtyS5f1GBw0twrJ6nE=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/insta-small.png"
            alt=""
        /></a>
        <a href="https://pk.linkedin.com/company/it-experts-pakistan1"
          ><img
            src="https://ci3.googleusercontent.com/meips/ADKq_NY7UperDuClEBCZO-sAKuZqwzEGW66XqnLCzBCjDv2XCDiKyQAcuozQJ4G_2ZOVKce1VzlFUAI7tQefF82hwvW_9I90PFK2uXZtSrJuJFCvpdhZqh0x-UCBN5lBrSBYjM0_Of-n3wDSCefxAv0hDnJ0kKl2RWDuy-Rb-GA1Mh0=s0-d-e1-ft#https://attachment.nayapay.com:8443/fileUploader/download/UPLOAD_DIRECTORY/EMAILASSETS/linkedin-small.png"
            alt=""
        /></a>
      </div>
    </div>
  </body>
</html>`;
  }

  let transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER_EMAIL,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let subject;

switch (emailType) {
  case "RESETPASSWORD":
    subject = "Reset Password";
    break;
  case "INVOICEGENERATED":
    subject = "Pay Your Invoice";
    break;
  default:
    subject = "No Email";
    break;
}
  

  let mailoptions = {
    from,
    to: email,
    subject,
    html: output,
  };
 
  transport.sendMail(mailoptions, (error, info) => {
    if (error) {
      return false;
    }
    return true;
  });
}

//module.exports = {sendEmail};
