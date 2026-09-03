import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';

interface PetSummary {
  name: string;
  breed: string;
  age: string;
  weight: string;
  avatar: string;
  nextVaccine: string;
  vaccineDate: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'passport' | 'vets' | 'sos' | 'ai'>('home');
  const [activePetIndex, setActivePetIndex] = useState(0);

  const pets: PetSummary[] = [
    {
      name: 'Bruno',
      breed: 'Golden Retriever',
      age: '2 years',
      weight: '28.5 kg',
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
      nextVaccine: 'Rabies Booster (Defensor 3)',
      vaccineDate: 'Due in 25 days',
    },
    {
      name: 'Luna',
      breed: 'Persian Longhair Cat',
      age: '1.4 years',
      weight: '4.2 kg',
      avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
      nextVaccine: 'FVRCP Tri-cat Vaccine',
      vaccineDate: 'Up to date',
    },
  ];

  const currentPet = pets[activePetIndex];

  const handleBook = () => {
    Alert.alert('Book Appointment', 'Opening verified veterinary clinics near you...');
  };

  const handleSOS = () => {
    setActiveTab('sos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* TOP APP BAR */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandTitle}>🐾 pets.care</Text>
          <Text style={styles.greeting}>Good morning, Aditya 👋</Text>
        </View>

        {/* Pet Switcher */}
        <View style={styles.petSwitchContainer}>
          {pets.map((p, idx) => (
            <TouchableOpacity
              key={p.name}
              onPress={() => setActivePetIndex(idx)}
              style={[
                styles.petSwitchPill,
                activePetIndex === idx && styles.petSwitchPillActive,
              ]}
            >
              <Text
                style={[
                  styles.petSwitchText,
                  activePetIndex === idx && styles.petSwitchTextActive,
                ]}
              >
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* MAIN CONTENT AREA */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'home' && (
          <>
            {/* HERO PET CARD */}
            <View style={styles.heroCard}>
              <View style={styles.heroRow}>
                <Image source={{ uri: currentPet.avatar }} style={styles.petAvatar} />
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{currentPet.name}</Text>
                  <Text style={styles.petMeta}>
                    {currentPet.breed} • {currentPet.age}
                  </Text>
                  <View style={styles.weightBadge}>
                    <Text style={styles.weightText}>⚖️ {currentPet.weight}</Text>
                    <Text style={styles.statusPillText}>Verified ID: #pass-{currentPet.name.toLowerCase()}</Text>
                  </View>
                </View>
              </View>

              {/* NEXT VACCINE COUNTDOWN BANNER */}
              <View style={styles.vaccineAlertBanner}>
                <View style={styles.vaccineIconContainer}>
                  <Text style={styles.vaccineIcon}>💉</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.vaccineAlertTitle}>Next Vaccination</Text>
                  <Text style={styles.vaccineAlertSub}>{currentPet.nextVaccine}</Text>
                </View>
                <View style={styles.countdownBadge}>
                  <Text style={styles.countdownText}>{currentPet.vaccineDate}</Text>
                </View>
              </View>
            </View>

            {/* QUICK ACTIONS GRID */}
            <Text style={styles.sectionHeader}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionBtn} onPress={handleBook}>
                <View style={[styles.actionIconBg, { backgroundColor: '#d1fae5' }]}>
                  <Text style={styles.actionEmoji}>🩺</Text>
                </View>
                <Text style={styles.actionLabel}>Book Vet</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveTab('passport')}>
                <View style={[styles.actionIconBg, { backgroundColor: '#e0f2fe' }]}>
                  <Text style={styles.actionEmoji}>📋</Text>
                </View>
                <Text style={styles.actionLabel}>Passport</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} onPress={handleSOS}>
                <View style={[styles.actionIconBg, { backgroundColor: '#fee2e2' }]}>
                  <Text style={styles.actionEmoji}>🚨</Text>
                </View>
                <Text style={[styles.actionLabel, { color: '#dc2626', fontWeight: '700' }]}>
                  SOS Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveTab('ai')}>
                <View style={[styles.actionIconBg, { backgroundColor: '#fef3c7' }]}>
                  <Text style={styles.actionEmoji}>🤖</Text>
                </View>
                <Text style={styles.actionLabel}>AI Assistant</Text>
              </TouchableOpacity>
            </View>

            {/* UPCOMING TIMELINE */}
            <Text style={styles.sectionHeader}>Upcoming Reminders</Text>
            <View style={styles.timelineList}>
              <View style={styles.timelineItem}>
                <Text style={styles.itemEmoji}>💊</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>Apoquel 16mg Allergy Tablet</Text>
                  <Text style={styles.itemSub}>Tomorrow • 9:00 AM • Morning Food</Text>
                </View>
                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => Alert.alert('Logged', 'Marked as given!')}
                >
                  <Text style={styles.doneBtnText}>✓ Done</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.timelineItem}>
                <Text style={styles.itemEmoji}>✂️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>Full Spa & De-shedding Bath</Text>
                  <Text style={styles.itemSub}>Saturday • 11:00 AM • Paws & Whiskers</Text>
                </View>
                <Text style={styles.upcomingPill}>Upcoming</Text>
              </View>
            </View>
          </>
        )}

        {/* SOS EMERGENCY MODE TAB */}
        {activeTab === 'sos' && (
          <View style={styles.sosContainer}>
            <View style={styles.sosHeaderCard}>
              <Text style={styles.sosTitle}>🚨 1-TAP EMERGENCY SOS</Text>
              <Text style={styles.sosSub}>
                Instant verified 24/7 trauma care and critical medical passport for {currentPet.name}.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.emergencyCallBtn}
              onPress={() => Alert.alert('Dialing Emergency', 'Calling Apex 24/7 Trauma Care (+91 80 2525 9999)...')}
            >
              <Text style={styles.emergencyCallText}>📞 Call Apex 24/7 Trauma: 080 2525 9999</Text>
            </TouchableOpacity>

            <View style={styles.criticalCard}>
              <Text style={styles.criticalCardTitle}>⚠️ Critical Medical Information</Text>
              <Text style={styles.criticalRow}>
                • <Text style={styles.bold}>Severe Allergies:</Text> Chicken protein, Dust mites
              </Text>
              <Text style={styles.criticalRow}>
                • <Text style={styles.bold}>Blood Type:</Text> DEA 1.1 Negative
              </Text>
              <Text style={styles.criticalRow}>
                • <Text style={styles.bold}>Current Medications:</Text> Apoquel 16mg (Once daily)
              </Text>
              <Text style={styles.criticalRow}>
                • <Text style={styles.bold}>Microchip #:</Text> 985141004291884
              </Text>
            </View>
          </View>
        )}

        {/* DIGITAL HEALTH PASSPORT TAB */}
        {activeTab === 'passport' && (
          <View style={styles.passportContainer}>
            <View style={styles.passportCard}>
              <Text style={styles.passportHeader}>OFFICIAL PET HEALTH PASSPORT</Text>
              <Text style={styles.passportUuid}>ID: pass-{currentPet.name.toLowerCase()}-2026</Text>
              <Image source={{ uri: currentPet.avatar }} style={styles.passportAvatar} />
              <Text style={styles.passportPetName}>{currentPet.name}</Text>
              <Text style={styles.passportBreed}>{currentPet.breed}</Text>

              <View style={styles.passportBadgeRow}>
                <View style={styles.passportBadge}>
                  <Text style={styles.passportBadgeText}>✓ Rabies Valid</Text>
                </View>
                <View style={styles.passportBadge}>
                  <Text style={styles.passportBadgeText}>✓ DHPP Valid</Text>
                </View>
                <View style={styles.passportBadge}>
                  <Text style={styles.passportBadgeText}>✓ Microchipped</Text>
                </View>
              </View>

              <Text style={styles.qrNotice}>
                📲 Show this QR Code to any veterinarian or boarding kennel for full verified records.
              </Text>
            </View>
          </View>
        )}

        {/* AI ASSISTANT TAB */}
        {activeTab === 'ai' && (
          <View style={styles.aiContainer}>
            <View style={styles.aiWelcomeCard}>
              <Text style={styles.aiTitle}>🤖 AI Pet Health Assistant</Text>
              <Text style={styles.aiSub}>
                Ask symptoms, nutrition questions, or vaccination guidelines tailored for {currentPet.name}.
              </Text>
              <Text style={styles.aiDisclaimer}>
                ⚠️ Does not replace clinical veterinary advice. In emergencies, use SOS Mode.
              </Text>
            </View>

            <View style={styles.aiSampleQuestion}>
              <Text style={styles.aiSampleText}>
                "Bruno hasn't eaten since yesterday and seems tired."
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navIcon, activeTab === 'home' && styles.navActive]}>🏠</Text>
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('passport')}
        >
          <Text style={[styles.navIcon, activeTab === 'passport' && styles.navActive]}>📋</Text>
          <Text style={[styles.navLabel, activeTab === 'passport' && styles.navLabelActive]}>Passport</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('sos')}
        >
          <Text style={[styles.navIcon, activeTab === 'sos' && styles.navActive]}>🚨</Text>
          <Text style={[styles.navLabel, activeTab === 'sos' && { color: '#dc2626', fontWeight: '700' }]}>
            SOS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('ai')}
        >
          <Text style={[styles.navIcon, activeTab === 'ai' && styles.navActive]}>🤖</Text>
          <Text style={[styles.navLabel, activeTab === 'ai' && styles.navLabelActive]}>AI Assistant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#059669',
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  petSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 3,
  },
  petSwitchPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  petSwitchPillActive: {
    backgroundColor: '#059669',
  },
  petSwitchText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  petSwitchTextActive: {
    color: '#ffffff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 90,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#10b981',
  },
  petInfo: {
    marginLeft: 16,
    flex: 1,
  },
  petName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  petMeta: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  weightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  weightText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  statusPillText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vaccineAlertBanner: {
    marginTop: 16,
    backgroundColor: '#ecfdf5',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaccineIconContainer: {
    marginRight: 10,
  },
  vaccineIcon: {
    fontSize: 22,
  },
  vaccineAlertTitle: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  vaccineAlertSub: {
    fontSize: 13,
    fontWeight: '700',
    color: '#064e3b',
  },
  countdownBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countdownText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 24,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    alignItems: 'center',
    width: '22%',
  },
  actionIconBg: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  timelineList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  itemSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  doneBtn: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  doneBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  upcomingPill: {
    fontSize: 11,
    color: '#f97316',
    fontWeight: '600',
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
  },
  navActive: {
    transform: [{ scale: 1.1 }],
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#059669',
    fontWeight: '700',
  },
  sosContainer: {
    gap: 16,
  },
  sosHeaderCard: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  sosTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#b91c1c',
  },
  sosSub: {
    fontSize: 13,
    color: '#7f1d1d',
    marginTop: 4,
  },
  emergencyCallBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  emergencyCallText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
  criticalCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  criticalCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  criticalRow: {
    fontSize: 13,
    color: '#334155',
    marginVertical: 4,
  },
  bold: {
    fontWeight: '700',
  },
  passportContainer: {
    alignItems: 'center',
  },
  passportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  passportHeader: {
    fontSize: 14,
    fontWeight: '900',
    color: '#047857',
    letterSpacing: 1,
  },
  passportUuid: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 16,
  },
  passportAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#059669',
  },
  passportPetName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 12,
  },
  passportBreed: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  passportBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
  passportBadge: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  passportBadgeText: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '700',
  },
  qrNotice: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
  },
  aiContainer: {
    gap: 16,
  },
  aiWelcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  aiTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  aiSub: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4,
  },
  aiDisclaimer: {
    fontSize: 11,
    color: '#d97706',
    backgroundColor: '#fffbeb',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    fontWeight: '600',
  },
  aiSampleQuestion: {
    backgroundColor: '#f1f5f9',
    padding: 14,
    borderRadius: 12,
  },
  aiSampleText: {
    fontSize: 13,
    color: '#334155',
    fontStyle: 'italic',
  },
});
