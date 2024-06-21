import React, { cloneElement } from "react";
import { Platform, View } from "react-native";
import { useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import { BaseText } from "components/base/base-text/BaseText";
import {
  AchievementMarginLockedSvg,
  AchievementMarginSvg,
  CardCorrectBackSvg,
  CardWrongBackSvg,
} from "@svgs";
import { getCardHeight } from "pages/topic-page/constants";
import BaseBlurImage from "components/base/base-blur-image/BaseBlurImage";
import LinearGradient from "react-native-linear-gradient";
import {
  changeOpacityOfRgbaColor,
  hexColorToRgba,
  scaleFontSizeToPixelRatioAndroid,
} from "@utils";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface TopicAchievementCardProps {
  title?: string;
  content: string;
  cardHeight?: number;
  fill?: string;
  image?: string;
  unlocked?: boolean;
  state?: "correct" | "wrong";
  cardsCollected?: number;
  cardsCount?: number;
  gray?: boolean;
}

const UPPER_GRADIENT_COLORS = [
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.7),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.5),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.1),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.0),
];
const UPPER_NO_GRADIENT_COLORS = [
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.0),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.0),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.0),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.0),
];
const LOWER_GRADIENT_COLORS = [
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.0),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.4),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.7),
  changeOpacityOfRgbaColor(hexColorToRgba("#000000"), 0.9),
];
export const PLACEHOLDER_PHOTO = require("resources/assets/achievement-placeholder.jpg");

const TopicAchievementCard: React.FC<TopicAchievementCardProps> = ({
  title,
  content,
  cardHeight: cardHeightFromProps,
  image,
  unlocked = true,
  state,
  cardsCollected = 1,
  cardsCount = 1,
  gray,
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const fullCardHeight = getCardHeight(screenHeight);
  const cardHeight = cardHeightFromProps ?? fullCardHeight;

  const countRef = React.useRef(0);
  const animated = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animated.value === 2 ? 1 : 0,
    };
  }, []);

  const imageStyle = {
    width: cardHeight * 0.755,
    height: cardHeight * 0.7,
  };

  const imageComponent = React.useMemo(() => {
    return (
      <Animated.View style={animatedStyle}>
        <BaseBlurImage
          key={`topic-achievement-card-${image}`}
          uri={
            image
              ? `https://[application].s3.amazonaws.com/achievements/webp-compressed-characters/${image}.webp`
              : `https://[application].s3.amazonaws.com/achievements/webp-compressed-characters/pompeii-1.webp`
          }
          imageStyle={imageStyle}
          gray={gray ?? (unlocked ? false : true)}
          onLoadStart={() => {
            animated.value = 0;
            countRef.current = 0;
          }}
          onLoadSuccess={() => {
            countRef.current = countRef.current + 1;
            animated.value = countRef.current;
          }}
        />
      </Animated.View>
    );
  }, [gray, image, unlocked]);
  const reverseImage = cloneElement(imageComponent);

  return (
    <View
      style={[
        styles.cardContent,
        {
          height: cardHeight * 1.06,
          width: cardHeight * 0.755,
          borderRadius: cardHeight * 0.04,
        },
      ]}
    >
      <View>
        {imageComponent}
        {state ? (
          <>
            <View
              style={[
                styles.stateIcon,
                {
                  top: -cardHeight * 0.22,
                },
              ]}
            >
              {state === "correct" ? (
                <CardCorrectBackSvg
                  width={cardHeight * 0.755}
                  height={cardHeight * 0.755 * 1.32}
                />
              ) : state === "wrong" ? (
                <CardWrongBackSvg
                  width={cardHeight * 0.755}
                  height={cardHeight * 0.755 * 1.32}
                />
              ) : undefined}
            </View>
            <View
              style={[
                styles.stateContainer,
                {
                  left: cardHeight * 0.06,
                  right: cardHeight * 0.06,
                  top: cardHeight * 0.1,
                  bottom: cardHeight * 0.26,
                  justifyContent: "center",
                },
              ]}
            >
              <BaseText type={"jockey-30"} style={styles.stateTitle}>
                {`${state}!`}
              </BaseText>
              <BaseText
                type={"texturina-16-regular"}
                style={[
                  styles.stateSubtitle,
                  {
                    marginTop: cardHeight * 0.01,
                    lineHeight: undefined,
                  },
                ]}
                adjustsFontSizeToFit
                numberOfLines={4}
                minimumFontScale={0.8}
              >
                {content}
              </BaseText>
            </View>
          </>
        ) : undefined}
        {!unlocked ? (
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1 }}
            locations={[0, 0.4, 0.8, 1]}
            colors={
              state !== undefined
                ? UPPER_NO_GRADIENT_COLORS
                : UPPER_GRADIENT_COLORS
            }
            style={[
              styles.upperGradient,
              {
                height: cardHeight * 0.2,
              },
            ]}
          >
            <BaseText
              style={[
                styles.subtitle,
                {
                  marginTop: cardHeight * 0.045,
                  fontFamily: "JockeyOne-Regular",
                  fontSize:
                    (Platform.OS === "android"
                      ? scaleFontSizeToPixelRatioAndroid(16)
                      : 16) *
                    (cardHeight / fullCardHeight),
                },
              ]}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={1}
              minimumFontScale={0.75}
              numberOfLines={1}
            >
              {`${Math.round(
                (cardsCount ? cardsCollected / cardsCount : 1) * 100
              )}% COMPLETED`}
            </BaseText>
          </LinearGradient>
        ) : undefined}
      </View>
      <View style={[styles.height, { paddingBottom: cardHeight * 0.1 }]}>
        <View style={styles.absolute}>
          <View style={styles.mirror}>{reverseImage}</View>
        </View>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1 }}
          locations={[0, 0.1, 0.2, 1]}
          colors={LOWER_GRADIENT_COLORS}
          style={[
            styles.lowerGradient,
            {
              top: -cardHeight * 0.1,
            },
          ]}
        />
        <View
          style={[
            styles.textContainer,
            { paddingHorizontal: cardHeight * 0.06 },
          ]}
        >
          {title ? (
            <BaseText
              style={[
                styles.title,
                {
                  fontFamily: "JockeyOne-Regular",
                  fontSize:
                    (Platform.OS === "android"
                      ? scaleFontSizeToPixelRatioAndroid(24)
                      : 24) *
                    (cardHeight / fullCardHeight),
                },
              ]}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={1}
              minimumFontScale={0.75}
              numberOfLines={1}
            >
              {title}
            </BaseText>
          ) : null}
          <BaseText
            style={[
              styles.subtitle,
              {
                fontFamily: "Texturina-Regular",
                fontSize:
                  (Platform.OS === "android"
                    ? scaleFontSizeToPixelRatioAndroid(16)
                    : 16) *
                  (cardHeight / fullCardHeight),
              },
            ]}
            adjustsFontSizeToFit
            numberOfLines={3}
            minimumFontScale={0.75}
          >
            {state === "correct"
              ? "Swipe down to dive into\nearning this achievement."
              : state === "wrong"
              ? "Swipe down to learn the answer\nand collect the achievement."
              : content}
          </BaseText>
        </View>
      </View>
      <View style={styles.margin}>
        {unlocked ? (
          <AchievementMarginSvg height={cardHeight} fill={"#F6F4EF"} />
        ) : (
          <AchievementMarginLockedSvg
            height={cardHeight}
            fill={"#F6F4EF"}
            progress={cardsCollected / cardsCount}
          />
        )}
      </View>
    </View>
  );
};

export default TopicAchievementCard;
