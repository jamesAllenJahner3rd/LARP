declare module "next-video" {
  import { ComponentType, VideoHTMLAttributes } from "react";

  const Video: ComponentType<
    VideoHTMLAttributes<HTMLVideoElement> & { src: string }
  >;
  export default Video;
}
