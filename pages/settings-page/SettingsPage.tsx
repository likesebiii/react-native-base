import React from "react";
import {
  useBaseCustomerInfo,
  useBaseAspect,
  useBaseAnalytics,
  useBaseRestorePurchase,
  useBaseBrowserActions,
} from "@hooks";
import { aspectStyle } from "./aspect";
import Page from "templates/page/Page";
import { PageProps } from "templates/utils";
import { NAVIGATION_CONTROLLER } from "services/navigation";
import SettingsEntry from "components/settings/settings-entry/SettingsEntry";
import { BaseText } from "components/base/base-text/BaseText";
import { ScrollView } from "react-native";
import { Analytics, Rate, useSelectVortex, Vortex } from "@services";
import { onLogout } from "services/navigation/navigation.utils";
import SettingsSectionTitle from "../../components/settings/settings-section-title/SettingsSectionTitle";

type SettingsPageProps = {};

const onAnalytics = (element: string) => {
  Analytics.log(
    "settingsTap",
    {
      element,
    },
    ["amplitude"]
  );
};

const SettingsPage: React.FC<SettingsPageProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { subscription } = useSelectVortex("user-vortex", (item) => {
    return item.pro;
  });

  const { developer } = useBaseCustomerInfo({});

  const { onContactUsPress, onPrivacyPress, onTermsPress } =
    useBaseBrowserActions();

  useBaseAnalytics({ page: "settings-page" });

  const onInterestsPress = () => {
    onAnalytics("interests");
    if (Vortex.select("user-vortex", "selectIsNSI")) {
      NAVIGATION_CONTROLLER.navigate("fk.RegisterDrawer", {
        type: "nsi-access",
      });
    } else {
      NAVIGATION_CONTROLLER.navigate("fk.SettingsInterestsPage", {});
    }
  };

  const onSignOut = () => {
    onAnalytics("sign-out");
    onLogout();
  };

  const onMangeSubscription = () => {
    onAnalytics("manage-subscription");
    NAVIGATION_CONTROLLER.navigate("fk.SettingsManageSubscriptionPage", {});
  };

  const onDeveloperMenu = () => {
    onAnalytics("developer-menu");
    NAVIGATION_CONTROLLER.navigate("fk.SettingsDeveloperMenuPage", {});
  };

  const { onRestore } = useBaseRestorePurchase();

  const onRatePress = () => {
    onAnalytics("rate");
    Rate.rate(false);
  };

  return (
    <Page
      style={styles.container}
      navigation={{
        type: "rebrand",
        title: "Settings",
        backHandler: true,
      }}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsSectionTitle title={"Subscription"} />
        <SettingsEntry
          title={
            <BaseText type={"texturina-16-regular"} style={styles.text}>
              {"Status: "}
              <BaseText type={"texturina-16-bold"}>
                {subscription ? "Pro" : "Free"}
              </BaseText>
            </BaseText>
          }
          onPress={onMangeSubscription}
        />
        {subscription === false ? (
          <SettingsEntry title={"Restore Purchases"} onPress={onRestore} />
        ) : undefined}
        {developer ? (
          <>
            <SettingsSectionTitle title={"Developer"} margin />
            <SettingsEntry title={"Developer menu"} onPress={onDeveloperMenu} />
          </>
        ) : undefined}
        <SettingsSectionTitle title={"My account"} margin />
        <SettingsEntry title={"Interests"} onPress={onInterestsPress} />
        <SettingsEntry title={"Sign Out"} onPress={onSignOut} />
        <SettingsSectionTitle title={"About [application]"} margin />
        <SettingsEntry title={"Rate us"} onPress={onRatePress} />
        <SettingsEntry title={"Contact us"} onPress={onContactUsPress} />
        <SettingsEntry title={"Terms of service"} onPress={onTermsPress} />
        <SettingsEntry title={"Privacy policy"} onPress={onPrivacyPress} />
      </ScrollView>
    </Page>
  );
};

export default SettingsPage;
