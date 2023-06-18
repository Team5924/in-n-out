import Image from "next/image";
import React, { useRef, useState } from "react";
import { MdExitToApp } from "react-icons/md";
import { signOut } from "next-auth/react";
import { IconContext } from "react-icons";
import OutsideClickHandler from "react-outside-click-handler";

export default function ProfilePictureSignOut({
  signOutProfileImageSrc,
}: {
  signOutProfileImageSrc: string;
}) {
  const [popupOpen, setPopupOpen] = useState(false);
  const lastOutsideClickRef = useRef(new Date(0));

  return (
    <>
      {popupOpen && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setPopupOpen(false);
            lastOutsideClickRef.current = new Date();
            console.log(lastOutsideClickRef.current);
          }}
        >
          <div
            className="absolute right-7 top-16 flex items-center justify-start rounded-lg bg-white px-1 py-2.5 hover:bg-gray-300"
            onClick={() => signOut()}
          >
            <IconContext.Provider value={{ color: "black" }}>
              <MdExitToApp className="mx-1"></MdExitToApp>
            </IconContext.Provider>
            <p className="mx-1 font-semibold text-black">Sign Out</p>
          </div>
        </OutsideClickHandler>
      )}
      <Image
        className="rounded-full outline-4 outline-yellow-300 transition-all hover:outline"
        onClick={() => {
          const timeSinceLastOutsideClick =
            Date.now() - lastOutsideClickRef.current.getTime();
          console.log(timeSinceLastOutsideClick);
          if (timeSinceLastOutsideClick >= 20) setPopupOpen(true);
        }}
        alt="Profile picture"
        src={signOutProfileImageSrc}
        width={44}
        height={44}
      />
    </>
  );
}
