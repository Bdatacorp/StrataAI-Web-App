import { Modules } from "@/lib/config/modules";
import { Text } from "@mantine/core";
import { Metadata } from "next";
import React from "react";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: Modules.GUEST.PRIVACY.title,
  description: Modules.GUEST.PRIVACY.description,
};

const text = `

**Last Updated: 23/07/2024**

**1\. Introduction**

Welcome to Strata Chat AI ("we," "our," "us"). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered chatbot, Strata Chat AI.


**2\. Information We Collect**

**2.1 Personal Information** We may collect personal information that you provide to us directly, including but not limited to:

* Name  
* Email address  
* Company or organization name  
* Any other information you choose to provide

**2.2 Usage Data** We automatically collect certain information when you interact with Strata Chat AI, including:

* Chat logs and interaction history  
* PDF documents and metadata  
* Device information (e.g., IP address, browser type, operating system)  
* Usage patterns (e.g., timestamps, features used)

**3\. How We Use Your Information**

We use the information we collect for various purposes, including:

* Providing, operating, and maintaining Strata Chat AI  
* Enhancing and personalising your experience  
* Analysing usage and improving our services  
* Communicating with you, including customer support  
* Ensuring the security of our services  
* Complying with legal obligations  
* Marketing of relevant products

**4\. Sharing Your Information**

We may share your information in the following situations:

* With service providers who perform functions on our behalf  
* To comply with legal obligations or protect our rights  
* In connection with a business transaction, such as a merger or acquisition  
* With your consent or at your direction

**5\. Data Security**

We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.

**6\. Your Rights and Choices**

Depending on your jurisdiction, you may have certain rights regarding your personal information, including:

* Accessing, correcting, or deleting your personal data  
* Restricting or objecting to our use of your data  
* Data portability  
* Withdrawing consent

To exercise these rights, please contact us using the contact information provided below.

**7\. Retention of Your Information**

We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or as required by law.

**8\. Children's Privacy**

Strata Chat AI is not intended for use by individuals under the age of 18\. We do not knowingly collect personal information from children under 18\. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.

**9\. Changes to This Privacy Policy**

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.

**10\. Contact Us**

If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:

Email: privacy@stratapages.com.au  
Address: PO Box1325 Bundoora Vic 3083

---

**Your use of Strata Chat AI indicates your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use our services.**


`;

export default function TermsPage() {
  return (
    <>
      <Text fw={500} size="lg" mt="md">
        {Modules.GUEST.PRIVACY.name}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        <Markdown className="leading-6">{text}</Markdown>
      </Text>
    </>
  );
}
