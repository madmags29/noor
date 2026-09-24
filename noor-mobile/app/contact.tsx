import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Linking,
  Alert,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/context/LanguageContext';
import { THEME } from '../src/theme';

type ContactCategory = 'business' | 'feedback' | 'complaint' | 'general';

interface CategoryItem {
  id: ContactCategory;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function ContactScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const [category, setCategory] = useState<ContactCategory>('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const CATEGORIES: CategoryItem[] = [
    { id: 'business', label: 'Business & B2B', icon: 'briefcase-outline', color: '#f59e0b' },
    { id: 'feedback', label: 'App Feedback', icon: 'chatbubbles-outline', color: '#34d399' },
    { id: 'complaint', label: 'Report Issue', icon: 'alert-circle-outline', color: '#f87171' },
    { id: 'general', label: 'General Deen', icon: 'help-circle-outline', color: '#38bdf8' },
  ];

  const handleCopyEmail = () => {
    Clipboard.setString('salam@nooreilahi.com');
    Alert.alert('Email Copied', 'salam@nooreilahi.com copied to your clipboard.');
  };

  const handleOpenEmailApp = () => {
    const mailtoUrl = `mailto:salam@nooreilahi.com?subject=${encodeURIComponent(
      subject || `[${category.toUpperCase()}] Inquiry via NOOR App`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\n\nMessage:\n${message}`
    )}`;
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Unable to open mail client', 'Please write directly to salam@nooreilahi.com');
    });
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Valid Email Required', 'Please provide a valid email address.');
      return;
    }
    if (!subject.trim()) {
      Alert.alert('Subject Required', 'Please enter a subject line.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      Alert.alert('Message Too Short', 'Please enter your message (minimum 10 characters).');
      return;
    }

    setSubmitting(true);

    try {
      // Attempt API submission to shared backend
      const response = await fetch('https://www.nooreilahi.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          organization,
          category,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (data.success && data.ticketId) {
        setSubmittedTicket(data.ticketId);
        setName('');
        setEmail('');
        setOrganization('');
        setSubject('');
        setMessage('');
      } else {
        // Fallback to mail client
        handleOpenEmailApp();
      }
    } catch {
      // In case of offline, prompt to open email client directly
      handleOpenEmailApp();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02120d" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{t('contact') || 'Contact & Support'}</Text>
            <Text style={styles.headerSub}>salam@nooreilahi.com • Response within 24h</Text>
          </View>
          <TouchableOpacity onPress={handleCopyEmail} style={styles.copyHeaderBtn}>
            <Ionicons name="copy-outline" size={17} color="#f59e0b" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Prominent Official Email Card */}
          <View style={styles.emailCard}>
            <View style={styles.emailCardHeader}>
              <View style={styles.emailIconBox}>
                <Ionicons name="mail" size={20} color="#02120d" />
              </View>
              <View style={styles.emailTextCol}>
                <Text style={styles.emailLabel}>OFFICIAL ISLAMIC & BUSINESS INBOX</Text>
                <Text style={styles.emailAddress}>salam@nooreilahi.com</Text>
              </View>
            </View>

            <Text style={styles.emailDesc}>
              Monitored 24/7 for partnerships, feature suggestions, prayer time audits, and community assistance.
            </Text>

            <View style={styles.emailActionRow}>
              <TouchableOpacity onPress={handleCopyEmail} style={styles.pillButton}>
                <Ionicons name="copy-outline" size={13} color="#f59e0b" />
                <Text style={styles.pillButtonText}>Copy Email</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenEmailApp} style={styles.pillButtonPrimary}>
                <Ionicons name="send" size={13} color="#02120d" />
                <Text style={styles.pillButtonPrimaryText}>Open Mail App</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Success Banner if submitted */}
          {submittedTicket && (
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={28} color="#34d399" />
              <View style={{ flex: 1 }}>
                <Text style={styles.successTitle}>Inquiry Sent to salam@nooreilahi.com!</Text>
                <Text style={styles.successSub}>
                  Ticket Reference: <Text style={styles.ticketHighlight}>{submittedTicket}</Text>
                </Text>
                <Text style={styles.successDesc}>Our team will review and reply within 24 hours.</Text>
              </View>
              <TouchableOpacity onPress={() => setSubmittedTicket(null)}>
                <Ionicons name="close" size={18} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>
          )}

          {/* Category Selector */}
          <Text style={styles.sectionTitle}>SELECT INQUIRY TYPE</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryBtn, active && styles.categoryBtnActive]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Ionicons name={cat.icon} size={15} color={active ? '#02120d' : cat.color} />
                  <Text style={[styles.categoryBtnText, active && styles.categoryBtnTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.formHeading}>Send Direct Message</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Tariq Mansoor"
                placeholderTextColor="rgba(110, 231, 183, 0.3)"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Your Email *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. tariq@domain.com"
                placeholderTextColor="rgba(110, 231, 183, 0.3)"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Organization / Company (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Al-Noor Islamic Foundation"
                placeholderTextColor="rgba(110, 231, 183, 0.3)"
                value={organization}
                onChangeText={setOrganization}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject Line *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Business partnership proposal"
                placeholderTextColor="rgba(110, 231, 183, 0.3)"
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Message & Details *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Write your inquiry or feedback with relevant details..."
                placeholderTextColor="rgba(110, 231, 183, 0.3)"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Ionicons name="send" size={16} color="#02120d" />
              <Text style={styles.submitBtnText}>
                {submitting ? 'Transmitting...' : 'Submit to salam@nooreilahi.com'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy & Shariah Compliance Note */}
          <View style={styles.complianceCard}>
            <Ionicons name="shield-checkmark" size={16} color="#f59e0b" />
            <Text style={styles.complianceText}>
              100% Shariah Compliant • Zero Data Sale • Direct Confidential Support
            </Text>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#02120d',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  headerSub: {
    color: '#6ee7b7',
    fontSize: 11,
    marginTop: 1,
  },
  copyHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emailCard: {
    backgroundColor: '#031c15',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    marginBottom: 20,
  },
  emailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emailIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailTextCol: {
    flex: 1,
  },
  emailLabel: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  emailAddress: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  emailDesc: {
    color: 'rgba(110, 231, 183, 0.75)',
    fontSize: 11.5,
    lineHeight: 16,
    marginTop: 12,
  },
  emailActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  pillButtonText: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '700',
  },
  pillButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#f59e0b',
  },
  pillButtonPrimaryText: {
    color: '#02120d',
    fontSize: 11,
    fontWeight: '800',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#03261c',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#34d399',
    marginBottom: 20,
  },
  successTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  successSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: 2,
  },
  ticketHighlight: {
    color: '#f59e0b',
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  successDesc: {
    color: '#6ee7b7',
    fontSize: 10.5,
    marginTop: 4,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#031712',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  categoryBtnActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  categoryBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  categoryBtnTextActive: {
    color: '#02120d',
  },
  formCard: {
    backgroundColor: '#031712',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 18,
  },
  formHeading: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: '#6ee7b7',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#010e0a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: 12.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 100,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f59e0b',
    borderRadius: 14,
    paddingVertical: 13,
    marginTop: 8,
  },
  submitBtnText: {
    color: '#02120d',
    fontSize: 13,
    fontWeight: '900',
  },
  complianceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  complianceText: {
    color: 'rgba(110, 231, 183, 0.7)',
    fontSize: 10,
    fontWeight: '600',
  },
});
