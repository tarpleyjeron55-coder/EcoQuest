import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  badges,
  categoryStats,
  dailyTasks,
  ecoTips,
  feedPosts,
  wardrobeItems,
  weeklyChallenges,
  type EcoTask,
  type FeedPost,
  type WardrobeItem,
} from './src/ecoquestData';

type Tab = 'Home' | 'Onboarding' | 'Feed' | 'Map' | 'Shop' | 'Profile';

const tabs: Tab[] = ['Home', 'Onboarding', 'Feed', 'Map', 'Shop', 'Profile'];
const avatarTraits = ['Anime cel-shaded base', 'Expressive face', 'Starter outfit', 'Rotating preview'];
const privacyLevels = ['Exact for task proof', 'Neighborhood for feed', 'City only for profile'];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const activeTip = useMemo(() => ecoTips[1], []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>EcoQuest prototype</Text>
            <Text style={styles.title}>Make local eco-actions visible</Text>
          </View>
          <View style={styles.pointsPill} accessibilityLabel="Current eco-points balance 1280">
            <Text style={styles.pointsValue}>1,280</Text>
            <Text style={styles.pointsLabel}>points</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipCategory}>{activeTip.category} tip</Text>
          <Text style={styles.tipHeadline}>{activeTip.headline}</Text>
          <Text style={styles.tipDetail}>{activeTip.detail}</Text>
        </View>

        <View style={styles.tabBar} accessibilityRole="tablist">
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === tab }}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </Pressable>
          ))}
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
          {activeTab === 'Home' && <HomeScreen />}
          {activeTab === 'Onboarding' && <OnboardingScreen />}
          {activeTab === 'Feed' && <FeedScreen />}
          {activeTab === 'Map' && <MapScreen />}
          {activeTab === 'Shop' && <ShopScreen />}
          {activeTab === 'Profile' && <ProfileScreen />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <>
      <AvatarSummary />
      <Section title="Today" subtitle="Complete any 3 tasks to keep your streak alive.">
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Daily progress</Text>
            <Text style={styles.progressValue}>2 of 4</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.mutedText}>Current streak: 6 days. Streak multiplier: 1.3x.</Text>
        </View>
        {dailyTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Section>
      <Section title="Weekly bonus missions" subtitle="Finish the full set for an extra multiplier.">
        {weeklyChallenges.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Section>
    </>
  );
}

function OnboardingScreen() {
  return (
    <>
      <Section title="Character creator" subtitle="A Pokemon Go inspired first-run flow for identity and consent.">
        <View style={styles.creatorLayout}>
          <AvatarPreview />
          <View style={styles.creatorCopy}>
            {avatarTraits.map((trait) => (
              <Text key={trait} style={styles.listItem}>- {trait}</Text>
            ))}
          </View>
        </View>
      </Section>
      <Section title="Setup steps" subtitle="Each step maps to a real onboarding screen.">
        {['Choose avatar base', 'Enter avatar name', 'Select race and ethnicity representation', 'Pick a free starter outfit', 'Choose location privacy'].map((step, index) => (
          <View key={step} style={styles.stepRow}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </Section>
      <Section title="Location precision" subtitle="Users opt in and can downgrade precision at any time.">
        {privacyLevels.map((level) => (
          <View key={level} style={styles.privacyPill}>
            <Text style={styles.privacyText}>{level}</Text>
          </View>
        ))}
      </Section>
    </>
  );
}

function FeedScreen() {
  return (
    <Section title="Local community feed" subtitle="Approved photo submissions become neighborhood posts.">
      {feedPosts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </Section>
  );
}

function MapScreen() {
  return (
    <>
      <Section title="Activity map" subtitle="Anonymized hotspots show where eco-actions are happening nearby.">
        <View style={styles.mapCard}>
          <View style={[styles.hotspot, styles.hotspotLarge]}>
            <Text style={styles.hotspotText}>Waste x18</Text>
          </View>
          <View style={[styles.hotspot, styles.hotspotMedium]}>
            <Text style={styles.hotspotText}>Nature x9</Text>
          </View>
          <View style={[styles.hotspot, styles.hotspotSmall]}>
            <Text style={styles.hotspotText}>Bike x7</Text>
          </View>
          <View style={styles.mapRoadOne} />
          <View style={styles.mapRoadTwo} />
        </View>
      </Section>
      <Section title="Privacy model" subtitle="Pins are region-level, never precise public addresses.">
        <Text style={styles.bodyText}>
          Photos retain exact coordinates only when needed for verification. Public feed and map surfaces use neighborhood or city precision based on user settings.
        </Text>
      </Section>
    </>
  );
}

function ShopScreen() {
  return (
    <>
      <Section title="Wardrobe shop" subtitle="Cosmetics are earned with eco-points, with no real-money purchases.">
        <View style={styles.shopPreview}>
          <AvatarPreview compact />
          <View style={styles.shopBalance}>
            <Text style={styles.progressTitle}>Preview item</Text>
            <Text style={styles.bodyText}>Rotate the 3D avatar, inspect rarity, then unlock with points.</Text>
          </View>
        </View>
        {wardrobeItems.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </Section>
    </>
  );
}

function ProfileScreen() {
  return (
    <>
      <Section title="Profile stats" subtitle="Progress, badges, and approved submission gallery.">
        <View style={styles.statsGrid}>
          <StatCard label="Tasks" value="43" />
          <StatCard label="Streak" value="6 days" />
          <StatCard label="Badges" value="3" />
          <StatCard label="Gallery" value="28 photos" />
        </View>
      </Section>
      <Section title="Category breakdown" subtitle="Stats support missions and future badge rules.">
        {categoryStats.map((stat) => (
          <View key={stat.label} style={styles.profileRow}>
            <Text style={styles.profileLabel}>{stat.label}</Text>
            <Text style={styles.profileValue}>{stat.value}</Text>
          </View>
        ))}
      </Section>
      <Section title="Badges" subtitle="Earned from streaks, categories, and community milestones.">
        <View style={styles.badgeWrap}>
          {badges.map((badge) => (
            <View key={badge} style={styles.badgePill}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      </Section>
    </>
  );
}

function AvatarSummary() {
  return (
    <View style={styles.avatarSummary}>
      <AvatarPreview compact />
      <View style={styles.avatarSummaryText}>
        <Text style={styles.sectionTitle}>Ari the Eco Scout</Text>
        <Text style={styles.bodyText}>Level 8 avatar with Forest Hoodie equipped.</Text>
        <Text style={styles.mutedText}>Next unlock: Solar Patch Backpack at 420 points.</Text>
      </View>
    </View>
  );
}

function AvatarPreview({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.avatarStage, compact && styles.avatarStageCompact]} accessibilityLabel="Stylized avatar preview placeholder">
      <View style={styles.avatarHead} />
      <View style={styles.avatarBody} />
      <View style={styles.avatarPlatform} />
    </View>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

function TaskCard({ task }: { task: EcoTask }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{task.title}</Text>
          <Text style={styles.cardMeta}>{task.category} - {task.difficulty}</Text>
        </View>
        <Text style={styles.pointReward}>+{task.points}</Text>
      </View>
      <Text style={styles.bodyText}>{task.evidencePrompt}</Text>
      <Pressable style={styles.primaryButton} accessibilityRole="button">
        <Text style={styles.primaryButtonText}>Upload photo evidence</Text>
      </Pressable>
    </View>
  );
}

function FeedCard({ post }: { post: FeedPost }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.feedIdentity}>
          <View style={styles.feedAvatar} />
          <View>
            <Text style={styles.cardTitle}>{post.avatarName}</Text>
            <Text style={styles.cardMeta}>{post.distance} - {post.neighborhood}</Text>
          </View>
        </View>
        <Text style={styles.statusText}>{post.moderationStatus}</Text>
      </View>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>{post.category} photo</Text>
      </View>
      <Text style={styles.cardTitle}>{post.taskTitle}</Text>
      <Text style={styles.bodyText}>{post.description}</Text>
      <Pressable style={styles.secondaryButton} accessibilityRole="button">
        <Text style={styles.secondaryButtonText}>Leaf reaction - {post.reactions}</Text>
      </Pressable>
    </View>
  );
}

function ShopItem({ item }: { item: WardrobeItem }) {
  return (
    <View style={styles.shopItem}>
      <View>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardMeta}>{item.category} - {item.rarity}</Text>
      </View>
      <View style={styles.shopCostPill}>
        <Text style={styles.shopCostText}>{item.locked ? `${item.cost} pts` : 'Owned'}</Text>
      </View>
    </View>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF7EF',
  },
  appShell: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  kicker: {
    color: '#2D6A4F',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0B2E1F',
    fontSize: 24,
    fontWeight: '800',
    maxWidth: 250,
  },
  pointsPill: {
    alignItems: 'center',
    backgroundColor: '#0F5132',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pointsValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  pointsLabel: {
    color: '#D8F3DC',
    fontSize: 11,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBE8D7',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  tipCategory: {
    color: '#40916C',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  tipHeadline: {
    color: '#0B2E1F',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },
  tipDetail: {
    color: '#425466',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tabButton: {
    backgroundColor: '#D8F3DC',
    borderRadius: 999,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  tabButtonActive: {
    backgroundColor: '#1B4332',
  },
  tabText: {
    color: '#1B4332',
    fontSize: 13,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: '#0B2E1F',
    fontSize: 20,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#587267',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  sectionContent: {
    marginTop: 12,
  },
  avatarSummary: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    flexDirection: 'row',
    padding: 16,
  },
  avatarSummaryText: {
    flex: 1,
    marginLeft: 16,
  },
  avatarStage: {
    alignItems: 'center',
    backgroundColor: '#D8F3DC',
    borderRadius: 28,
    height: 190,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 150,
  },
  avatarStageCompact: {
    borderRadius: 22,
    height: 118,
    width: 96,
  },
  avatarHead: {
    backgroundColor: '#F0C7A8',
    borderColor: '#57351F',
    borderRadius: 999,
    borderWidth: 3,
    height: 46,
    marginBottom: -4,
    width: 46,
    zIndex: 2,
  },
  avatarBody: {
    backgroundColor: '#2D6A4F',
    borderColor: '#0B2E1F',
    borderRadius: 22,
    borderWidth: 3,
    height: 72,
    width: 62,
    zIndex: 1,
  },
  avatarPlatform: {
    backgroundColor: '#95D5B2',
    borderRadius: 999,
    height: 18,
    marginTop: -5,
    width: 98,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    color: '#0B2E1F',
    fontSize: 16,
    fontWeight: '800',
  },
  progressValue: {
    color: '#2D6A4F',
    fontSize: 16,
    fontWeight: '800',
  },
  progressTrack: {
    backgroundColor: '#D8F3DC',
    borderRadius: 999,
    height: 12,
    marginBottom: 10,
  },
  progressFill: {
    backgroundColor: '#52B788',
    borderRadius: 999,
    height: 12,
    width: '50%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8F3DC',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#0B2E1F',
    fontSize: 16,
    fontWeight: '800',
  },
  cardMeta: {
    color: '#587267',
    fontSize: 13,
    marginTop: 2,
  },
  bodyText: {
    color: '#425466',
    fontSize: 14,
    lineHeight: 20,
  },
  mutedText: {
    color: '#6B8178',
    fontSize: 13,
    lineHeight: 18,
  },
  pointReward: {
    color: '#1B4332',
    fontSize: 18,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#1B4332',
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#D8F3DC',
    borderRadius: 14,
    marginTop: 12,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#1B4332',
    fontSize: 14,
    fontWeight: '800',
  },
  creatorLayout: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 16,
  },
  creatorCopy: {
    flex: 1,
    marginLeft: 16,
  },
  listItem: {
    color: '#425466',
    fontSize: 14,
    lineHeight: 24,
  },
  stepRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 14,
  },
  stepNumber: {
    backgroundColor: '#1B4332',
    borderRadius: 999,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 12,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  stepText: {
    color: '#0B2E1F',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  privacyPill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBE8D7',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  privacyText: {
    color: '#1B4332',
    fontSize: 14,
    fontWeight: '700',
  },
  feedIdentity: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  feedAvatar: {
    backgroundColor: '#95D5B2',
    borderColor: '#1B4332',
    borderRadius: 999,
    borderWidth: 2,
    height: 42,
    marginRight: 10,
    width: 42,
  },
  statusText: {
    color: '#40916C',
    fontSize: 12,
    fontWeight: '800',
  },
  photoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#CBE8D7',
    borderRadius: 16,
    height: 150,
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoText: {
    color: '#1B4332',
    fontSize: 15,
    fontWeight: '800',
  },
  mapCard: {
    backgroundColor: '#CBE8D7',
    borderRadius: 24,
    height: 300,
    overflow: 'hidden',
    position: 'relative',
  },
  hotspot: {
    alignItems: 'center',
    backgroundColor: '#52B788',
    borderColor: '#FFFFFF',
    borderRadius: 999,
    borderWidth: 3,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 3,
  },
  hotspotLarge: {
    height: 118,
    left: 26,
    top: 38,
    width: 118,
  },
  hotspotMedium: {
    height: 94,
    right: 34,
    top: 92,
    width: 94,
  },
  hotspotSmall: {
    bottom: 36,
    height: 78,
    left: 126,
    width: 78,
  },
  hotspotText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  mapRoadOne: {
    backgroundColor: '#EAF7EF',
    height: 26,
    left: -30,
    position: 'absolute',
    top: 168,
    transform: [{ rotate: '-18deg' }],
    width: 420,
  },
  mapRoadTwo: {
    backgroundColor: '#EAF7EF',
    height: 22,
    left: 70,
    position: 'absolute',
    top: -20,
    transform: [{ rotate: '72deg' }],
    width: 360,
  },
  shopPreview: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
  },
  shopBalance: {
    flex: 1,
    marginLeft: 16,
  },
  shopItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D8F3DC',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 16,
  },
  shopCostPill: {
    backgroundColor: '#D8F3DC',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  shopCostText: {
    color: '#1B4332',
    fontSize: 13,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    padding: 16,
    width: '48%',
  },
  statValue: {
    color: '#0B2E1F',
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    color: '#587267',
    fontSize: 13,
    marginTop: 4,
  },
  profileRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 14,
  },
  profileLabel: {
    color: '#0B2E1F',
    fontSize: 14,
    fontWeight: '700',
  },
  profileValue: {
    color: '#2D6A4F',
    fontSize: 14,
    fontWeight: '900',
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badgePill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#95D5B2',
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#1B4332',
    fontSize: 13,
    fontWeight: '800',
  },
});
