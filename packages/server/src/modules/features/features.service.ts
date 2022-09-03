import { Injectable } from '@nestjs/common';
import { AppFeature, AppFeatures } from './types';

@Injectable()
export class FeaturesService {
  private readonly FEATURES: AppFeatures = {
    emailVerification: {
      enabled: process.env.FEATURE_EMAIL_VERIFICATION_ENABLED === 'true',
      privateConfig: {
        tokenSecret: process.env.FEATURE_EMAIL_VERIFICATION_TOKEN_SECRET,
      },
    },
  };

  getFeaturesWithConfigs(): AppFeatures {
    return this.FEATURES;
  }

  /**
   *
   * Expose method for controller, remove private configs from each feature
   */
  listFeatures() {
    const features = {};
    for (const key in { ...this.FEATURES }) {
      const f: AppFeature = this.FEATURES[key];
      features[key] = f.enabled;
    }
    return features;
  }

  getFeature(featureName: keyof AppFeatures): AppFeature {
    return this.FEATURES[featureName];
  }

  isFeatureEnabled(featureName: keyof AppFeatures): boolean {
    return this.FEATURES[featureName].enabled;
  }
}
