"use client";

import React, { useCallback, useState } from "react";

export default function MyPageContents() {
  // const [loading, setLoading] = useState(true);
  // or
  // const [uid, setUid] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userSessionNickname, setUserSessionNickname] = useState("");
  const [nickname, setNickname] = useState("");

  // 세션 안에 있는 닉네임, 이메일 가져오기
  // const getSession = async () => {
  //   const session = await getUserSession();
  //   if (session && session.session) {
  //     const sessionNickname = session.session.user.user_metadata.nickname;
  //     const sessionProfileImg = session.session.user.user_metadata.user_image;
  //     setUserSessionNickname(sessionNickname);
  //     setNickname(sessionNickname);
  //     setAvatar(sessionProfileImg);
  //   }
  //   return;
  // };
  // getSession();
  console.log(nickname);

  return (
    <section>
      <form>
        <div>
          <img alt="프로필 이미지" />
        </div>
        <div>
          <label>프로필 사진 업로드</label>
          <img src={avatar} alt="프로필 이미지" />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          {isEditing ? (
            <input
              type="text"
              maxLength={10}
              value={nickname || ""}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          ) : (
            <p>{nickname}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <p>namnam12@gmail.com</p>
        </div>

        {!isEditing ? (
          <div>
            <button>수정하기</button>
            <button>로그아웃</button>
          </div>
        ) : (
          <div>
            <button>수정완료</button>
            <button>취소</button>
          </div>
        )}
      </form>
    </section>
  );
}
