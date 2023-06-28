import ReactMarkdown from "react-markdown";

const content = `
# Privacy Policy

**Effective Date:** 28 June 2023

Thank you for using our Apple app, EmpathAttic. This Privacy Policy describes how we collect, use, and disclose information when you use our app developed by VoidFnc ("we," "our," or "us").

## 1. Information We Collect

### 1.1 Personal Information
We do not collect any personal information that can directly identify you, such as your name, address, phone number, or email address when you use our EmpathAttic app.

### 1.2 Non-Personal Information
We may collect non-personal information automatically when you use our app, including but not limited to:
- **Device Information:** We may collect information about your device, such as the model, operating system version, unique device identifier (UDID), and other technical information.
- **App Usage Data:** We may collect information about how you use our app, including the features you interact with, the time spent on the app, and other usage statistics.

## 2. How We Use Your Information

### 2.1 Personal Information
Since we do not collect personal information through our app, we do not use it for any purpose.

### 2.2 Non-Personal Information
We may use non-personal information collected through our app for the following purposes:
- **To improve our app:** We may analyze usage patterns and app performance to enhance the user experience and optimize our services.
- **To troubleshoot issues:** Non-personal information may help us identify and address technical problems or app crashes.
- **To comply with legal obligations:** We may use non-personal information to comply with applicable laws, regulations, or legal processes.

## 3. Information Sharing and Disclosure

We do not share or disclose your personal or non-personal information collected through our EmpathAttic app with third parties, except in the following circumstances:
- **With your consent:** We may share information if you provide your explicit consent for a specific purpose.
- **For legal reasons:** We may disclose information when we believe it is necessary to comply with a legal obligation, protect our rights, or enforce our policies.
- **With service providers:** We may engage trusted third-party service providers to assist us in analyzing app usage data or improving our services. These providers are bound by confidentiality agreements and are prohibited from using the information for any other purpose.

## 4. Data Retention

We retain non-personal information collected through our EmpathAttic app for as long as necessary to fulfill the purposes outlined in this Privacy Policy. Afterward, we will securely delete or anonymize the information.

## 5. Children's Privacy

Our app does not knowingly collect personal information from children under the age of 13. If we become aware that a child under 13 has provided personal information, we will promptly delete it from our records.

## 6. Security

We are committed to protecting the security of your information. However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.

## 7. Changes to this Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the revised policy in our app or website. Please review this Privacy Policy periodically for any updates.

## 8. Contact Us

If you have any questions, concerns, or suggestions regarding this Privacy Policy or our privacy practices, please contact us at [insert contact information].

By using our EmpathAttic app, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as

`;

const PrivacyPolicyPage = () => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default PrivacyPolicyPage;
