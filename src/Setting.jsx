import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { wp, hp, fs } from './responsive';

export default function Setting({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleAction = (title) => {
    Alert.alert(title, `${title} option clicked.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#131926' }}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#131926" />

      {/* Header with Back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: wp(30) }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Details Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AH</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.userName}>Andrew Haider</Text>
            <Text style={styles.userRole}>EMPLOYEE • TMS MOBILE</Text>
            <Text style={styles.userEmail}>andrew.haider@example.com</Text>
          </View>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionHeader}>ACCOUNT</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => handleAction('Edit Profile')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>👤</Text>
              <Text style={styles.rowLabel}>Edit Profile</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => handleAction('Change Password')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>🔒</Text>
              <Text style={styles.rowLabel}>Change Password</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionHeader}>PREFERENCES</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>🔔</Text>
              <Text style={styles.rowLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#2D384D', true: '#0F9D7B' }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>✉️</Text>
              <Text style={styles.rowLabel}>Email Alerts</Text>
            </View>
            <Switch
              value={emailAlerts}
              onValueChange={setEmailAlerts}
              trackColor={{ false: '#2D384D', true: '#0F9D7B' }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>🌙</Text>
              <Text style={styles.rowLabel}>Dark Theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#2D384D', true: '#0F9D7B' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
        </View>

        {/* Support Section */}
        <Text style={styles.sectionHeader}>SUPPORT</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => handleAction('Privacy Policy')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>🛡️</Text>
              <Text style={styles.rowLabel}>Privacy Policy</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => handleAction('Help & FAQ')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.icon}>❓</Text>
              <Text style={styles.rowLabel}>Help & FAQ</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 1.0.0 (TMS Mobile)</Text>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131926',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingVertical: hp(14),
    borderBottomWidth: 1,
    borderBottomColor: '#1C2536',
  },
  backBtn: {
    width: wp(30),
    justifyContent: 'center',
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: fs(20),
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(18),
  },
  profileCard: {
    backgroundColor: '#161F2E',
    borderRadius: 12,
    padding: wp(16),
    borderWidth: 1,
    borderColor: '#222E42',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(24),
  },
  avatar: {
    width: wp(48),
    height: wp(48),
    borderRadius: wp(24),
    backgroundColor: '#0F9D7B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(14),
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '700',
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '700',
  },
  userRole: {
    color: '#0F9D7B',
    fontSize: fs(10),
    fontWeight: '700',
    marginTop: hp(2),
  },
  userEmail: {
    color: '#8A99AD',
    fontSize: fs(11),
    marginTop: hp(2),
  },
  sectionHeader: {
    color: '#5A667A',
    fontSize: fs(11),
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: hp(8),
    paddingHorizontal: wp(4),
  },
  settingsGroup: {
    backgroundColor: '#161F2E',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#222E42',
    marginBottom: hp(20),
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(12),
    paddingHorizontal: wp(14),
    borderBottomWidth: 1,
    borderBottomColor: '#1C2536',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
  },
  icon: {
    fontSize: fs(14),
  },
  rowLabel: {
    color: '#FFFFFF',
    fontSize: fs(13),
    fontWeight: '500',
  },
  arrowIcon: {
    color: '#5A667A',
    fontSize: fs(18),
  },
  versionText: {
    textAlign: 'center',
    color: '#5A667A',
    fontSize: fs(11),
    marginTop: hp(10),
    marginBottom: hp(20),
  },
});