import { useListFeaturesQuery } from "../services/api";
import { AppFeatures } from "../types/features";

export const useFeatures = () => {
  const { data } = useListFeaturesQuery(null);
  const features = data?.data;

  return {
    isFeatureEnabled: (featureName: keyof AppFeatures) => {
      return features ? features[featureName] : false;
    },
  };
};
