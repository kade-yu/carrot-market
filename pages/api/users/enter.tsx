import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `로그인을 하기 위해서는 ${payload}를 입력해주세요 `,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "yush7881@gmail.com",
    //   to: "yush7881@gmail.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }
  return res.json({
    ok: true,
  });
}

export default withHandler({ method: "POST", handler, isPrivate: false });

// ----> 유저 폰 번호 입력 ----> 백엔드에서 데이터베이스에 있는 유저의 폰 번호 검색
// ----> 유저가 있다면 데이터베이스에서 정보를 가져온다 (유저가 없다면 회원가입을 시킬 것임)
// ----> 그 유저를 위한 토큰을 발급할 것
// ----> 그 토큰을 유저와 커넥트 함
// ----> 토큰을 만든 다음에는 랜덤 숫자가 필요함
// ----> 이 랜덤 숫자를 유저에게 보낼 것임
// (유저가 로그인을 하려고 하면 문자로 유저의 폰 번호에 랜덤 숫자를 보내는 것) Twilio 로 구현예정
// ----> 토큰을 입력할 수 있는 창을 만들어준다. 이 정도가 백엔드로 전송
// ----> 백엔드는 이 토큰을 찾고 그 토큰과 연결된 유저 정보를 가져온다
// ----> 잘 찾았으면 로그인되도록 만든다

// Before Refactorying
// if (email) {
//   user = await client.user.findUnique({
//     where: {
//       email,
//     },
//   });
//   if (user) console.log("found it.");
//   if (!user) {
//     console.log("Did not find. Will Create");
//     user = await client.user.create({
//       data: {
//         name: "Anonymous",
//         email,
//       },
//     });
//   }
//   console.log(user);
// }
// if (phone) {
//   user = await client.user.findUnique({
//     where: {
//       phone: +phone,
//     },
//   });
//   if (user) console.log("found it.");
//   if (!user) {
//     console.log("Did not find. Will Create");
//     user = await client.user.create({
//       data: {
//         name: "Anonymous",
//         phone: +phone,
//       },
//     });
//   }
//   console.log(user);
// }
