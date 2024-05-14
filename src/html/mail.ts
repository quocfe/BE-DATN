function UI_SendMail(title: string, email: string, code: string) {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <title>Mạng xã hội DevBook</title>
      </head>
      <body
        style="
          font-size: 16px;
          font-weight: 400;
          line-height: 1.9;
          font-family: \'Roboto\', sans-serif;
        "
      >
        <div class="show" style="padding: 45px; background-color: #f5f5f5">
          <div style="background-color: #fff; padding: 45px">
            <div
              class="title"
              style="
                text-align: center;
                padding: 0 0 25px 0;
                font-size: 32px;
                font-weight: 600;
                letter-spacing: 0.3px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.12);
              "
            >
              ${title}
            </div>
            <div class="body">
              <h1 style="font-weight: 600; font-size: 24px">
                Xin chào, ${email}
              </h1>
              <p style="margin-top: 15px; font-size: 16px">
                Bạn vừa nhận được mã OTP xác nhận tại Mạng xã hội DevBook, mã này sẽ hết hiệu lực sau 2 phút.
              </p>
              <span
                style="
                  display: inline-block;
                  color: #2579f2;
                  border: 2px solid rgba(37, 121, 242, 0.5);
                  padding: 2px 15px;
                  border-radius: 5px;
                  font-weight: 600;
                  margin-top: 15px;
                  font-size: 24px;
                "
                >${code}</span
              >
              <p style="margin-top: 15px; font-size: 16px">
                Nếu bạn không thực hiện yêu cầu này xin vui lòng bỏ qua nó hoặc nếu
                cần hỗ trợ hãy liên hệ với chúng tôi ngay.
              </p>
              <p style="margin-top: 15px; font-size: 16px">
                Trân trọng <br />
                Mạng xã hội DevBook
              </p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 25px">
            Hotline hỗ trợ: 0373 405 375
          </p>
        </div>
      </body>
    </html>
  `
}

export default UI_SendMail
