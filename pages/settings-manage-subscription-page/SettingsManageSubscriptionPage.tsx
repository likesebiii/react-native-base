import React from "react";
import {
  useBaseCustomerInfo,
  useBaseAspect,
  useBaseBrowserActions,
} from "@hooks";
import { aspectStyle } from "./aspect";
import Page from "templates/page/Page";
import { PageProps } from "templates/utils";
import { NAVIGATION_CONTROLLER } from "services/navigation";
import { ScrollView, View } from "react-native";
import SettingsEntry from "components/settings/settings-entry/SettingsEntry";
import { BaseText } from "components/base/base-text/BaseText";
import { Analytics, useSelectVortex } from "@services";
import { stringifyDate } from "@utils";
import Purchases, { PurchasesStoreProduct } from "react-native-purchases";
import SettingsSectionTitle from "components/settings/settings-section-title/SettingsSectionTitle";

type SettingsManageSubscriptionPageProps = {};

const onAnalytics = (element: string) => {
  Analytics.log(
    "settingsTap",
    {
      element,
    },
    ["amplitude"]
  );
};

const SettingsManageSubscriptionPage: React.FC<
  SettingsManageSubscriptionPageProps & PageProps
> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const isPro = useSelectVortex("user-vortex", "selectUserSubscription");

  const { entitlement } = useBaseCustomerInfo({});

  const [subscription, setSubscription] =
    React.useState<PurchasesStoreProduct>();

  React.useEffect(() => {
    const productId = entitlement?.productIdentifier;

    if (productId) {
      Purchases.getProducts([productId]).then((products) => {
        const product = products[0];

        setSubscription(product);
      });
    }
  }, [entitlement]);

  const {
    onCancelPress,
    onContactUsPress,
    onFAQPress,
    onPrivacyPress,
    onTermsPress,
  } = useBaseBrowserActions();

  const onSubscribePress = () => {
    onAnalytics("subscribe");
    NAVIGATION_CONTROLLER.navigate("fk.PaywallPage", {
      location: "settings",
    });
  };

  return (
    <Page
      style={styles.container}
      navigation={{
        type: "rebrand",
        title: "Manage Subscription",
        backHandler: true,
      }}
    >
      <ScrollView style={styles.list} contentContainerStyle={styles.padding}>
        {isPro ? (
          <BaseText
            type={"texturina-16-semi-bold"}
            style={styles.text}
          >{`Details of your [application]+ subscription:`}</BaseText>
        ) : undefined}
        <View style={isPro ? { marginTop: 24 } : undefined}>
          <SettingsSectionTitle title={"Status"} />
          <BaseText
            type={"texturina-16-regular"}
            style={[styles.secondaryText, styles.marginTop]}
          >
            {isPro
              ? entitlement?.periodType === "TRIAL"
                ? "Trial"
                : "Pro"
              : "Free"}
          </BaseText>
          {isPro ? (
            <View style={styles.textMargin}>
              <BaseText
                type={"jockey-20"}
                style={styles.text}
              >{`SUBSCRIPTION PLAN`}</BaseText>
              <BaseText
                type={"texturina-16-regular"}
                style={[styles.secondaryText, styles.marginTop]}
              >
                {"[application]+"}
              </BaseText>
            </View>
          ) : undefined}
          {isPro ? (
            <View style={styles.textMargin}>
              <BaseText type={"jockey-20"} style={styles.text}>
                {entitlement?.periodType === "TRIAL" || entitlement?.willRenew
                  ? `NEXT BILLING DATE`
                  : "EXPIRATION DATE"}
              </BaseText>
              <BaseText
                type={"texturina-16-regular"}
                style={[styles.secondaryText, styles.marginTop]}
              >
                {entitlement?.expirationDate
                  ? stringifyDate({
                      date: new Date(entitlement.expirationDate),
                    })
                  : "Lifetime"}
              </BaseText>
            </View>
          ) : undefined}
          {isPro ? (
            <View style={styles.textMargin}>
              <BaseText
                type={"jockey-20"}
                style={styles.text}
              >{`PRICE`}</BaseText>
              <BaseText
                type={"texturina-16-regular"}
                style={[styles.secondaryText, styles.marginTop]}
              >
                {subscription?.priceString ?? "Gift"}
              </BaseText>
            </View>
          ) : undefined}
          <SettingsSectionTitle title={"Subscription"} margin />
          {isPro ? (
            <SettingsEntry
              title={"Cancel subscription"}
              onPress={onCancelPress}
            />
          ) : (
            <SettingsEntry title={"Subscribe"} onPress={onSubscribePress} />
          )}
        </View>
        <SettingsSectionTitle title={"Additional Info"} margin />
        <SettingsEntry title={"Contact us"} onPress={onContactUsPress} />
        <SettingsEntry title={"Terms of service"} onPress={onTermsPress} />
        <SettingsEntry title={"Privacy policy"} onPress={onPrivacyPress} />
        <SettingsEntry
          title={"FAQ Subscriptions & Billing"}
          onPress={onFAQPress}
        />
      </ScrollView>
    </Page>
  );
};

export default SettingsManageSubscriptionPage;
