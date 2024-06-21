import React from "react";
import { useBaseAnalytics, useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import Page from "templates/page/Page";
import { PageProps } from "templates/utils";
import { NAVIGATION_CONTROLLER } from "services/navigation";
import { CardsSvg, LivesSvg, SettingsSvg, StreakSvg } from "@svgs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ACTIVE_OPACITY, getUserAchievements } from "@utils";
import DeckPage from "pages/deck-page/DeckPage";
import { View } from "react-native";
import { BaseImage } from "components/base/base-image/BaseImage";
import { BaseText } from "components/base/base-text/BaseText";
import { Analytics, useSelectRedux, useSelectVortex } from "@services";
import { BasePrimaryButton } from "components/base/base-primary-button/BasePrimaryButton";

export interface ProfilePageProps {}

const NSI_NAME = "[application] User";

const AVATAR_PHOTO = require("resources/assets/avatar.jpg");

const ProfilePage: React.FC<ProfilePageProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { email = NSI_NAME } = useSelectRedux("current", "currentUser", [
    "email",
  ]);
  const lives = useSelectVortex("user-vortex", "selectUserLives");
  const streak = useSelectVortex("user-vortex", "selectUserCurrentStreak");

  const collectedQuestions = useSelectVortex(
    "user-vortex",
    "selectCollectedQuestions"
  );
  const cards = collectedQuestions.length;

  const achievementsCount = React.useMemo(() => {
    return getUserAchievements({ filterUnlockedAchievements: true }).length;
  }, []);

  const onSettings = () => {
    NAVIGATION_CONTROLLER.navigate("fk.SettingsPage", {});
    Analytics.log(
      "tapElement",
      { location: "profile-page", element: "settings" },
      ["amplitude"]
    );
  };

  useBaseAnalytics({ page: "profile-page" });

  const onRegisterPress = () => {
    Analytics.log(
      "tapElement",
      { location: "profile-page", element: "sign-up" },
      ["amplitude"]
    );
    NAVIGATION_CONTROLLER.navigate("fk.RegisterDrawer", { type: "nsi-create" });
  };

  return (
    <Page
      style={styles.container}
      navigation={{
        type: "rebrand",
        title: "Profile",
        backHandler: true,
        rightComponent: (
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={onSettings}>
            <SettingsSvg height={30} width={30} />
          </TouchableOpacity>
        ),
      }}
    >
      <DeckPage
        achievements
        filterUnlockedAchievements={achievementsCount === 0 ? false : true}
        disableNavigation
        header={
          <>
            <View style={styles.card}>
              <BaseImage
                source={AVATAR_PHOTO}
                style={{ width: 80, height: 80, borderRadius: 20 }}
                resizeMode="cover"
              />
              <View style={{ marginLeft: 16, flex: 1 }}>
                <BaseText
                  type={"texturina-24-semi-bold"}
                  style={styles.text}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {email}
                </BaseText>
                <View style={styles.row}>
                  <LivesSvg height={24} width={24} />
                  <BaseText
                    style={styles.livesText}
                    type={"texturina-20-regular"}
                  >{`${lives} ${lives === 1 ? "life" : "lives"}`}</BaseText>
                </View>
                <View style={styles.row}>
                  <StreakSvg height={24} width={24} />
                  <BaseText
                    style={styles.streakText}
                    type={"texturina-20-regular"}
                  >{`${streak} day${streak === 1 ? "" : "s"} streak`}</BaseText>
                </View>
                <View style={styles.row}>
                  <CardsSvg height={24} width={24} />
                  <BaseText
                    style={styles.cardsText}
                    type={"texturina-20-regular"}
                  >{`${cards} card${
                    cards === 1 ? "" : "s"
                  } collected`}</BaseText>
                </View>
              </View>
            </View>
            {email === NSI_NAME ? (
              <BasePrimaryButton
                containerStyle={styles.button}
                title={"Create an Account"}
                onPress={onRegisterPress}
              />
            ) : undefined}
          </>
        }
      />
    </Page>
  );
};

export default ProfilePage;
