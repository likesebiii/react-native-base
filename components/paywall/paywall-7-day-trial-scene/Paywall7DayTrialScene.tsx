import React from "react";
import { View } from "react-native";
import { useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import { dateToMonthDayString } from "@utils";
import { BaseText } from "components/base/base-text/BaseText";
import PaywallTrialExplanatoryStep from "../paywall-trial-explanatory-step/PaywallTrialExplanatoryStep";
import { ScrollView } from "react-native-gesture-handler";

type Paywall7DayTrialSceneProps = {
  header?: JSX.Element;
};

const getDateWithOffset = (offset: number) => {
  const trialDateNow = new Date();

  trialDateNow.setDate(trialDateNow.getDate() + offset);

  return dateToMonthDayString({ date: trialDateNow });
};

const Paywall7DayTrialScene: React.FC<Paywall7DayTrialSceneProps> = ({
  header,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {header}
      <View style={styles.titleContainer}>
        <BaseText type={"jockey-34"} style={styles.title}>
          {"How your free trial works"}
        </BaseText>
      </View>
      <View style={styles.explanatory}>
        <PaywallTrialExplanatoryStep
          title={"Install [application]"}
          lineThrough={true}
          separator={"enabled"}
          subtitle={"You’ve successfully set up [application]."}
        />
        <PaywallTrialExplanatoryStep
          title={"Now: Try [application]+"}
          separator={"enabled"}
          subtitle={"No payment now, just full access to all premium features."}
          type={"lock"}
        />
        <PaywallTrialExplanatoryStep
          enabled={false}
          title={"Day 5: Trial reminder"}
          separator={"disabled"}
          subtitle={`We'll send you a notification. Cancel anytime in 15 seconds.`}
          type={"bell"}
        />
        <PaywallTrialExplanatoryStep
          enabled={false}
          title={"Day 7: Trial ends"}
          subtitle={`Your subscription will start on ${getDateWithOffset(7)}.`}
          type={"star"}
        />
      </View>
    </ScrollView>
  );
};

export default Paywall7DayTrialScene;
