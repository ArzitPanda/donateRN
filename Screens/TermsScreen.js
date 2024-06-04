import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../LogioSvg';

const TermsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%',display:'flex',alignItems:'center',paddingBottom:20}}>
      <LogoSvg scale={1}/>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.date}>Effective Date: [Insert Date]</Text>
        
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to [Your Application Name] ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our application ("App") and the services provided through it. By accessing or using our App, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our App.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of the App</Text>
        <Text style={styles.subsectionTitle}>2.1 Eligibility</Text>
        <Text style={styles.text}>
          You must be at least [Insert Minimum Age] years old to use our App. By using our App, you represent and warrant that you meet this requirement.
        </Text>

        <Text style={styles.subsectionTitle}>2.2 Account Registration</Text>
        <Text style={styles.text}>
          To use certain features of our App, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account password and for any activities or actions under your account.
        </Text>

        <Text style={styles.subsectionTitle}>2.3 Prohibited Activities</Text>
        <Text style={styles.text}>
          You agree not to engage in any of the following prohibited activities:
        </Text>
        <Text style={styles.text}>
          - Copying, distributing, or disclosing any part of the App in any medium.
        </Text>
        <Text style={styles.text}>
          - Using any automated system, including without limitation "robots," "spiders," and "offline readers," to access the App.
        </Text>
        <Text style={styles.text}>
          - Attempting to interfere with the servers or networks connected to the App.
        </Text>
        <Text style={styles.text}>
          - Engaging in any conduct that restricts or inhibits any other user from using or enjoying the App.
        </Text>

        <Text style={styles.sectionTitle}>3. Termination</Text>
        <Text style={styles.text}>
          We may terminate or suspend your access to our App immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </Text>

        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        <Text style={styles.text}>
          To the maximum extent permitted by applicable law, in no event shall [Your Application Name], its affiliates, agents, directors, employees, suppliers, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the App; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the App; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our App by any third party; and/or (v) any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the App, whether based on warranty, contract, tort (including negligence), or any other legal theory, and whether or not we were advised of the possibility of such damages.
        </Text>

        <Text style={styles.sectionTitle}>5. Changes to the Terms</Text>
        <Text style={styles.text}>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about these Terms, please contact us at [Your Contact Information].
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  scrollView: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginVertical: 8,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
});

export default TermsScreen;
