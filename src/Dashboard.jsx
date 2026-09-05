import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { wp, hp, fs } from './responsive';

export default function Dashboard({ navigation }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Daily Tasks');

  const menuItems = [
    { id: '1', title: 'Dashboard', icon: '⚡' },
    { id: '2', title: 'All Tasks', icon: '📋' },
    { id: '3', title: 'All Projects', icon: '🗂️' },
    { id: '4', title: 'EOD List', icon: '📝' },
    { id: '5', title: 'Live Sheets', icon: '📊' },
    { id: '6', title: 'Daily Tasks', icon: '📌' },
    { id: '7', title: 'Task Schedule', icon: '📅' },
    { id: '8', title: 'App Evaluation', icon: '📱' },
    { id: '9', title: 'Settings', icon: '⚙️' },
  ];

  const [dailyTasks, setDailyTasks] = useState([
    {
      id: '1',
      title: 'Fix Authentication Token Issue',
      project: 'TMS Mobile App',
      time: '10:00 AM - 12:30 PM',
      priority: 'High',
      status: 'In Progress',
    },
    {
      id: '2',
      title: 'Design Dashboard Task Feed Component',
      project: 'TMS Mobile App',
      time: '01:30 PM - 03:30 PM',
      priority: 'Medium',
      status: 'Pending',
    },
    {
      id: '3',
      title: 'API Endpoint Integration & Testing',
      project: 'TMS Backend',
      time: '04:00 PM - 05:30 PM',
      priority: 'High',
      status: 'Pending',
    },
    {
      id: '4',
      title: 'Submit EOD Report',
      project: 'Daily Operations',
      time: '06:00 PM',
      priority: 'Low',
      status: 'Pending',
    },
  ]);

  const handleLogoutPress = () => {
    setIsSidebarOpen(false);
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.replace('Login');
        },
      },
    ]);
  };

  const handleMenuPress = (title) => {
    setActiveMenu(title);
    setIsSidebarOpen(false);

    if (title === 'Settings') {
      // Modal close hone ke sath navigation conflict se bachne ke liye chota timeout
      setTimeout(() => {
        navigation.navigate('Setting');
      }, 150);
    }
  };

  const toggleTaskStatus = (id) => {
    setDailyTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  const completedCount = dailyTasks.filter((t) => t.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / dailyTasks.length) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#131926" />

      {/* 1. Header with Hamburger, Title, and Mini Avatar only */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuIconBtn}
          onPress={() => setIsSidebarOpen(true)}
        >
          <View style={styles.menuBar} />
          <View style={[styles.menuBar, { width: wp(16) }]} />
          <View style={styles.menuBar} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Daily Tasks</Text>
          <Text style={styles.headerDate}>Assigned To You</Text>
        </View>

        <TouchableOpacity 
          style={styles.avatarMini}
          onPress={() => setIsSidebarOpen(true)}
        >
          <Text style={styles.avatarMiniText}>AH</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Main Body */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.taskSummaryCard}>
          <View>
            <Text style={styles.summaryHeading}>Today's Progress</Text>
            <Text style={styles.summarySub}>
              {completedCount} of {dailyTasks.length} tasks completed
            </Text>
          </View>
          <View style={styles.badgeProgress}>
            <Text style={styles.badgeProgressText}>{progressPercent}%</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>TODAY'S TASK LIST</Text>

        {dailyTasks.map((task) => {
          const isDone = task.status === 'Completed';
          return (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, isDone && styles.taskCardDone]}
              activeOpacity={0.8}
              onPress={() => toggleTaskStatus(task.id)}
            >
              <View style={styles.taskLeftRow}>
                <View style={[styles.statusCheckbox, isDone && styles.statusCheckboxDone]}>
                  {isDone && <Text style={styles.checkmark}>✓</Text>}
                </View>

                <View style={styles.taskDetails}>
                  <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>
                    {task.title}
                  </Text>
                  <Text style={styles.projectSubtitle}>{task.project}</Text>
                  <Text style={styles.taskTime}>🕒 {task.time}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.priorityTag,
                  task.priority === 'High' && styles.priorityHigh,
                  task.priority === 'Medium' && styles.priorityMedium,
                  task.priority === 'Low' && styles.priorityLow,
                ]}
              >
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 3. Slide-in Sidebar */}
      <Modal
        visible={isSidebarOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsSidebarOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdropClick}
            activeOpacity={1}
            onPress={() => setIsSidebarOpen(false)}
          />

          <View style={styles.drawerContainer}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.profileHeader}>
                <View style={styles.userInfoRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>AH</Text>
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.userRole}>EMPLOYEE</Text>
                    <Text style={styles.userName}>Andrew Haider</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sidebarSectionHeader}>CORE NAVIGATION</Text>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.menuContainer}>
                  {menuItems.map((item) => {
                    const isActive = activeMenu === item.title;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleMenuPress(item.title)}
                        style={[
                          styles.menuItem,
                          isActive && styles.activeMenuItem,
                        ]}
                      >
                        <View style={styles.leftContent}>
                          <Text style={styles.iconText}>{item.icon}</Text>
                          <Text
                            style={[
                              styles.menuTitle,
                              isActive && styles.activeMenuTitle,
                            ]}
                          >
                            {item.title}
                          </Text>
                        </View>

                        {isActive && <View style={styles.activeIndicator} />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  menuIconBtn: {
    padding: wp(6),
    gap: hp(4),
  },
  menuBar: {
    width: wp(22),
    height: hp(2.5),
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(16),
    fontWeight: '700',
  },
  headerDate: {
    color: '#8A99AD',
    fontSize: fs(11),
    marginTop: hp(2),
  },
  avatarMini: {
    width: wp(36),
    height: wp(36),
    borderRadius: wp(18),
    backgroundColor: '#0F9D7B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMiniText: {
    color: '#FFFFFF',
    fontSize: fs(12),
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(18),
  },
  taskSummaryCard: {
    backgroundColor: '#161F2E',
    borderWidth: 1,
    borderColor: '#2D384D',
    borderRadius: 12,
    padding: wp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(20),
  },
  summaryHeading: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '700',
  },
  summarySub: {
    color: '#8A99AD',
    fontSize: fs(12),
    marginTop: hp(4),
  },
  badgeProgress: {
    backgroundColor: 'rgba(15, 157, 123, 0.2)',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0F9D7B',
  },
  badgeProgressText: {
    color: '#0F9D7B',
    fontSize: fs(14),
    fontWeight: '700',
  },
  sectionHeader: {
    color: '#5A667A',
    fontSize: fs(11),
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: hp(12),
    paddingHorizontal: wp(4),
  },
  taskCard: {
    backgroundColor: '#161F2E',
    borderRadius: 10,
    padding: wp(14),
    marginBottom: hp(10),
    borderWidth: 1,
    borderColor: '#222E42',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskCardDone: {
    opacity: 0.5,
    borderColor: '#1C2536',
  },
  taskLeftRow: {
    flexDirection: 'row',
    flex: 1,
    marginRight: wp(10),
  },
  statusCheckbox: {
    width: wp(20),
    height: wp(20),
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#5A667A',
    marginRight: wp(12),
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCheckboxDone: {
    backgroundColor: '#0F9D7B',
    borderColor: '#0F9D7B',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: fs(11),
    fontWeight: 'bold',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: fs(14),
    fontWeight: '600',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#8A99AD',
  },
  projectSubtitle: {
    color: '#0F9D7B',
    fontSize: fs(11),
    marginTop: hp(3),
    fontWeight: '500',
  },
  taskTime: {
    color: '#8A99AD',
    fontSize: fs(11),
    marginTop: hp(4),
  },
  priorityTag: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(3),
    borderRadius: 4,
  },
  priorityHigh: {
    backgroundColor: 'rgba(255, 90, 95, 0.15)',
  },
  priorityMedium: {
    backgroundColor: 'rgba(255, 165, 0, 0.15)',
  },
  priorityLow: {
    backgroundColor: 'rgba(15, 157, 123, 0.15)',
  },
  priorityText: {
    fontSize: fs(10),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  backdropClick: {
    flex: 1,
  },
  drawerContainer: {
    width: wp(280),
    backgroundColor: '#131926',
    height: '100%',
    paddingHorizontal: wp(16),
    paddingVertical: hp(16),
    borderRightWidth: 1,
    borderRightColor: '#1C2536',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(16),
    borderBottomWidth: 1,
    borderBottomColor: '#1C2536',
    marginBottom: hp(14),
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(44),
    height: wp(44),
    borderRadius: wp(22),
    backgroundColor: '#0F9D7B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(12),
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '700',
  },
  profileInfo: {
    justifyContent: 'center',
  },
  userRole: {
    color: '#8A99AD',
    fontSize: fs(10),
    fontWeight: '700',
    letterSpacing: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '700',
    marginTop: hp(2),
  },
  sidebarSectionHeader: {
    color: '#5A667A',
    fontSize: fs(10),
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: hp(12),
    paddingHorizontal: wp(6),
  },
  menuContainer: {
    gap: hp(8),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(12),
    paddingHorizontal: wp(12),
    borderRadius: 8,
    backgroundColor: '#161F2E',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(15, 157, 123, 0.18)',
    borderWidth: 1,
    borderColor: '#0F9D7B',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
  },
  iconText: {
    fontSize: fs(15),
  },
  menuTitle: {
    color: '#A0AEC0',
    fontSize: fs(13),
    fontWeight: '500',
  },
  activeMenuTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  activeIndicator: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#0F9D7B',
  },
  logoutBtn: {
    marginTop: hp(12),
    paddingVertical: hp(12),
    backgroundColor: '#1C2536',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D384D',
  },
  logoutText: {
    color: '#FF5A5F',
    fontSize: fs(13),
    fontWeight: '700',
  },
});