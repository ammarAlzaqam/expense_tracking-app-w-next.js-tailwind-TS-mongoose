declare module "voucher-code-generator" {
  interface GenerateOptions {
    count?: number;
    length?: number;
    prefix?: string;
    postfix?: string;
    charset?: string;
    pattern?: string;
  }

  const voucher_codes: {
    generate(options?: GenerateOptions): string[];
  };

  export default voucher_codes;
}
