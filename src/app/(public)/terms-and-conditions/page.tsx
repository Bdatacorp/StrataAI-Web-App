import { Modules } from "@/lib/config/modules";
import { Text } from "@mantine/core";
import { Metadata } from "next";
import React from "react";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: Modules.GUEST.TERMS.title,
  description: Modules.GUEST.TERMS.description,
};

const text = `
# Terms and Conditions for Strata Chat AI

**Last Updated: 23/07/2024**

Welcome to Strata Chat AI ("we," "our," "us"). These Terms and Conditions ("Terms") govern your use of our AI-powered PDF reading chatbot, Strata Chat AI. By accessing or using Strata Chat AI, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our services.

## 1. Use of Services

### 1.1 Eligibility
- You must be at least 18 years old to use Strata Chat AI.
- By using our services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.

### 1.2 Licence
- We grant you a limited, non-exclusive, non-transferable, and revocable licence to access and use Strata Chat AI for personal or internal business purposes, in accordance with these Terms.

## 2. User Responsibilities

### 2.1 Accurate Information
- You agree to provide accurate and complete information when using Strata Chat AI and to keep such information up to date.

### 2.2 Lawful Use
- You agree to use Strata Chat AI in compliance with all applicable laws and regulations.
- You shall not use our services for any unlawful or fraudulent purposes.

### 2.3 Prohibited Conduct
You agree not to:
- Misuse or interfere with the operation of Strata Chat AI
- Attempt to gain unauthorized access to our systems or networks
- Use our services to transmit any harmful or malicious content
- Violate the privacy or rights of others

## 3. Intellectual Property

### 3.1 Ownership
- All intellectual property rights in Strata Chat AI, including but not limited to software, content, and trademarks, are owned by or licensed to us.
- You do not acquire any ownership rights by using our services.

### 3.2 Restrictions
- You may not reproduce, distribute, modify, or create derivative works of Strata Chat AI without our prior written consent.

## 4. Privacy
- Your use of Strata Chat AI is subject to our Privacy Policy, which explains how we collect, use, and safeguard your personal information.
- By using our services, you consent to our collection and use of your information as described in the Privacy Policy.

## 5. Disclaimers and Limitations of Liability

### 5.1 No Warranty
- Strata Chat AI is provided "as is" and "as available" without any warranties, express or implied.
- We do not guarantee that our services will be uninterrupted, error-free, or secure.

### 5.2 Limitation of Liability
- To the fullest extent permitted by law, we are not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of Strata Chat AI.

## 6. Indemnification
- You agree to indemnify, defend, and hold harmless Strata Chat AI, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of our services or your violation of these Terms.

## 7. Termination
- We may suspend or terminate your access to Strata Chat AI at any time, without notice, for any reason, including if you violate these Terms.
- Upon termination, your right to use our services will immediately cease.

## 8. Changes to These Terms
- We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page.
- Your continued use of Strata Chat AI after such changes indicates your acceptance of the updated Terms.

## 9. Governing Law
- These Terms are governed by and construed in accordance with the laws of Australia.
- Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Australia.

## 10. Contact Us
If you have any questions or concerns about these Terms, please contact us at:

- **Email:** support@stratapages.com.au
- **Address:** Po Box 1325, Bundoora 3083

By using Strata Chat AI, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
`;

export default function TermsPage() {
  return (
    <>
      <article className="prose ">
        <Markdown className="leading-6">{text}</Markdown>
      </article>
    </>
  );
}
