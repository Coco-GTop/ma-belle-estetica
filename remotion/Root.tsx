import { Composition } from "remotion";
import { HeroLoop, HERO_PHOTOS } from "./compositions/HeroLoop";

/**
 * Composizioni Remotion per Ma Belle Estetica.
 * Render hero: npm run hero:render  (vedi package.json)
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroLoop"
      component={HeroLoop}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={{ photos: HERO_PHOTOS }}
    />
  );
};
