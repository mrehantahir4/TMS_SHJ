import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert

} from 'react-native';

// Apni responsive file import kareinr
import { wp, hp, fs } from './responsive';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSignIn = () => {
        navigation.replace('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#131926" />

            {/* Top Left Spread Glow */}
            <LinearGradient
                colors={['rgba(15, 157, 123, 0.45)', 'rgba(15, 157, 123, 0.15)', 'transparent']}
                locations={[0, 0.45, 1]}
                style={styles.topLeftGlow}
            />

            {/* Bottom Right Spread Glow */}
            <LinearGradient
                colors={['rgba(15, 157, 123, 0.4)', 'rgba(15, 157, 123, 0.12)', 'transparent']}
                locations={[0, 0.45, 1]}
                style={styles.bottomRightGlow}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>

                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <View style={styles.logoBox}>
                                <Text style={styles.logoText}>SHJ</Text>
                            </View>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to your account</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#5A667A"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#5A667A"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />

                            <Text style={styles.label}>Login As</Text>
                            <View style={styles.roleContainer}>
                                <TouchableOpacity
                                    onPress={() => setRole('Employee')}
                                    style={[
                                        styles.roleButton,
                                        role === 'Employee' && styles.roleButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.roleText,
                                            role === 'Employee' && styles.roleTextActive,
                                        ]}
                                    >
                                        Employee
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setRole('Admin')}
                                    style={[
                                        styles.roleButton,
                                        role === 'Admin' && styles.roleButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.roleText,
                                            role === 'Admin' && styles.roleTextActive,
                                        ]}
                                    >
                                        Admin
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.rememberContainer}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.rememberText}>Remember me</Text>
                            </TouchableOpacity>

                            {/* AB YEH KAR DEIN: */}
                            <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
                                <Text style={styles.signInBtnText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131926',
        position: 'relative',
        overflow: 'hidden',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(24),
    },
    card: {
        width: '100%',
        maxWidth: 420,
        paddingHorizontal: wp(24),
    },
    topLeftGlow: {
        position: 'absolute',
        top: -hp(120),
        left: -wp(120),
        width: wp(380),
        height: wp(380),
        borderRadius: wp(190),
    },
    bottomRightGlow: {
        position: 'absolute',
        bottom: -hp(120),
        right: -wp(120),
        width: wp(400),
        height: wp(400),
        borderRadius: wp(200),
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: hp(24),
    },
    logoBox: {
        backgroundColor: '#FFFFFF',
        width: wp(60),
        height: wp(60),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(16),
    },
    logoText: {
        color: '#000',
        fontWeight: '900',
        fontSize: fs(18),
        letterSpacing: 2,
    },
    title: {
        fontSize: fs(22),
        fontWeight: '700',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: fs(13),
        color: '#8A99AD',
        marginTop: hp(4),
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: fs(13),
        fontWeight: '500',
        color: '#DCE4EC',
        marginBottom: hp(8),
    },
    input: {
        backgroundColor: '#1C2536',
        borderWidth: 1,
        borderColor: '#2D384D',
        borderRadius: 8,
        paddingHorizontal: wp(14),
        paddingVertical: hp(12),
        fontSize: fs(14),
        color: '#FFFFFF',
        marginBottom: hp(16),
    },
    roleContainer: {
        flexDirection: 'row',
        gap: wp(10),
        marginBottom: hp(18),
    },
    roleButton: {
        flex: 1,
        backgroundColor: '#1C2536',
        borderWidth: 1,
        borderColor: '#2D384D',
        borderRadius: 8,
        paddingVertical: hp(12),
        alignItems: 'center',
    },
    roleButtonActive: {
        borderColor: '#00B894',
        backgroundColor: 'rgba(0, 184, 148, 0.15)',
    },
    roleText: {
        color: '#8A99AD',
        fontSize: fs(14),
        fontWeight: '500',
    },
    roleTextActive: {
        color: '#00B894',
        fontWeight: '700',
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(24),
    },
    checkbox: {
        width: wp(18),
        height: wp(18),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#5A667A',
        backgroundColor: '#1C2536',
        marginRight: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: '#00B894',
        borderColor: '#00B894',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: fs(11),
        fontWeight: 'bold',
    },
    rememberText: {
        color: '#A0AEC0',
        fontSize: fs(13),
    },
    signInBtn: {
        backgroundColor: '#0F9D7B',
        borderRadius: 8,
        paddingVertical: hp(14),
        alignItems: 'center',
    },
    signInBtnText: {
        color: '#FFFFFF',
        fontSize: fs(15),
        fontWeight: '700',
    },
});