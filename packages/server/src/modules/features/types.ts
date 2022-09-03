export type AppFeature = {
  enabled: boolean;
  privateConfig: Record<string, string>;
};

export type EmailVerificationFeature = AppFeature & {
  privateConfig: {
    tokenSecret: string;
  };
};

export type AppFeatures = {
  emailVerification: EmailVerificationFeature;
};
