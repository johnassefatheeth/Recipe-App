import { defineRule } from "vee-validate";
import * as rules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(rules)
    .filter((k) => k !== "default")
    .forEach((rule) => {
      try {
        defineRule(rule, rules[rule]);
        console.log( rule);
      } catch (error) {
        console.error(`Error defining rule ${rule}:`, error);
      }
    });
});
