import { useEffect } from "react";
import { Avatar } from "@arco-design/web-react";
import { Camera } from "@carbon/icons-react";

let cloudinary;
let widget;

const UploadAvatar = ({ profileUrl, setProfileUrl }) => {
  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    function onIdle() {
      if (!widget) {
        widget = createWidget();
      }
    }

    "requestIdleCallback" in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
  }, []);

  function createWidget() {
    const options = {
      cloudName: "dgygacilr", // Ex: mycloudname
      uploadPreset: "xxjjx1z6", // Ex: myuploadpreset
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      if (error || result.event === "success") {
        if (error) {
          widget.close({
            quiet: true,
          });
          return;
        }
        setProfileUrl(result?.info?.secure_url);
      }
    });
  }

  function open() {
    if (!widget) {
      widget = createWidget();
    }
    widget && widget.open();
  }

  return (
    <Avatar style={{ marginBottom: 40 }} size={100} triggerIcon={<Camera />} triggerType="mask" onClick={open}>
      {profileUrl ? <img alt="avatar" src={profileUrl} /> : null}
    </Avatar>
  );
};

export default UploadAvatar;
