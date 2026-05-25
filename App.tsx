import { useMemo, useState, type ReactNode } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  avatarBases,
  badges,
  dailyTasks,
  ecoTips,
  privacyOptions,
  representationOptions,
  starterFeedPosts,
  starterOutfits,
  wardrobeItems,
  weeklyChallenges,
  type EcoTask,
  type FeedPost,
  type TaskCategory,
  type WardrobeItem,
} from './src/ecoquestData';

type Tab = 'Home' | 'Onboarding' | 'Feed' | 'Map' | 'Shop' | 'Profile';
type SubmissionStatus = 'AI plausible' | 'Needs review' | 'Approved';

type AvatarProfile = {
  name: string;
  base: string;
  representation: string;
  outfit: string;
  privacy: string;
};

type Submission = {
  id: string;
  taskId: string;
  taskTitle: string;
  category: TaskCategory;
  status: SubmissionStatus;
  points: number;
  evidenceNote: string;
  createdAt: string;
};

type PointLedgerEntry = {
  id: string;
  label: string;
  points: number;
};

const tabs: Tab[] = ['Home', 'Onboarding', 'Feed', 'Map', 'Shop', 'Profile'];
const categoryList: TaskCategory[] = ['Waste', 'Transport', 'Nature', 'Water', 'Energy', 'Community'];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [avatar, setAvatar] = useState<AvatarProfile>({
    name: 'Ari',
    base: avatarBases[2],
    representation: representationOptions[7],
    outfit: starterOutfits[0],
    privacy: privacyOptions[1],
  });
  const [tipIndex, setTipIndex] = useState(0);
  const [pointBalance, setPointBalance] = useState(1280);
  const [streak, setStreak] = useState(6);
  const [ownedItemIds, setOwnedItemIds] = useState<string[]>(
    wardrobeItems.filter((item) => !item.locked).map((item) => item.id),
  );
  const [equippedItemId, setEquippedItemId] = useState('starter-hoodie');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(starterFeedPosts);
  const [ledger, setLedger] = useState<PointLedgerEntry[]>([
    { id: 'starter-bonus', label: 'Starter path bonus', points: 1280 },
  ]);

  const activeTip = ecoTips[tipIndex];
  const allTasks = useMemo(() => [...dailyTasks, ...weeklyChallenges], []);
  const approvedSubmissions = submissions.filter((submission) => submission.status === 'Approved');
  const approvedTaskIds = new Set(approvedSubmissions.map((submission) => submission.taskId));
  const dailyApprovedCount = dailyTasks.filter((task) => approvedTaskIds.has(task.id)).length;
  const weeklyApprovedCount = weeklyChallenges.filter((task) => approvedTaskIds.has(task.id)).length;
  const streakMultiplier = dailyApprovedCount >= 3 ? 1.3 : 1;
  const equippedItem = wardrobeItems.find((item) => item.id === equippedItemId) ?? wardrobeItems[0];

  const categoryStats = categoryList.map((category) => ({
    label: category,
    value: approvedSubmissions.filter((submission) => submission.category === category).length,
  }));

  function updateAvatar(field: keyof AvatarProfile, value: string) {
    setAvatar((current) => ({ ...current, [field]: value }));
  }

  function rotateTip() {
    setTipIndex((current) => (current + 1) % ecoTips.length);
  }

  function createSubmission(task: EcoTask) {
    if (submissions.some((submission) => submission.taskId === task.id)) {
      return;
    }

    const needsReview = task.difficulty === 'Hard';
    const nextSubmission: Submission = {
      id: `submission-${Date.now()}-${task.id}`,
      taskId: task.id,
      taskTitle: task.title,
      category: task.category,
      status: needsReview ? 'Needs review' : 'AI plausible',
      points: task.points,
      evidenceNote: needsReview
        ? 'Mock image check found this task should enter human review.'
        : `Mock image check matched: ${task.verificationLabels.slice(0, 2).join(', ')}.`,
      createdAt: 'Just now',
    };

    setSubmissions((current) => [nextSubmission, ...current]);
  }

  function approveSubmission(submissionId: string) {
    const target = submissions.find((submission) => submission.id === submissionId);
    if (!target || target.status === 'Approved') {
      return;
    }

    const earnedPoints = Math.round(target.points * streakMultiplier);
    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === submissionId ? { ...submission, status: 'Approved' } : submission,
      ),
    );
    setPointBalance((current) => current + earnedPoints);
    setStreak((current) => current + 1);
    setLedger((current) => [
      { id: `ledger-${submissionId}`, label: target.taskTitle, points: earnedPoints },
      ...current,
    ]);
    setFeedPosts((current) => [
      {
        id: `feed-${submissionId}`,
        avatarName: avatar.name || 'Eco Scout',
        taskTitle: target.taskTitle,
        category: target.category,
        distance: avatar.privacy === 'City only' ? 'same city' : '0.2 miles away',
        neighborhood: avatar.privacy === 'Exact for verification' ? 'Neighborhood hidden' : 'Your neighborhood',
        moderationStatus: 'Approved',
        reactions: 0,
        description: 'Approved EcoQuest submission shared from the local prototype flow.',
        createdAt: 'Just now',
      },
      ...current,
    ]);
  }

  function sendToReview(submissionId: string) {
    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === submissionId ? { ...submission, status: 'Needs review' } : submission,
      ),
    );
  }

  function reactToPost(postId: string) {
    setFeedPosts((current) =>
      current.map((post) => (post.id === postId ? { ...post, reactions: post.reactions + 1 } : post)),
    );
  }

  function purchaseOrEquip(item: WardrobeItem) {
    const isOwned = ownedItemIds.includes(item.id);
    if (isOwned) {
      setEquippedItemId(item.id);
      return;
    }

    if (pointBalance < item.cost) {
      return;
    }

    setPointBalance((current) => current - item.cost);
    setOwnedItemIds((current) => [...current, item.id]);
    setEquippedItemId(item.id);
    setLedger((current) => [
      { id: `purchase-${item.id}`, label: `Unlocked ${item.name}`, points: -item.cost },
      ...current,
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>EcoQuest local MVP</Text>
            <Text style={styles.title}>Make local eco-actions visible</Text>
          </View>
          <View style={styles.pointsPill} accessibilityLabel={`Current eco-points balance ${pointBalance}`}>
            <Text style={styles.pointsValue}>{pointBalance.toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>points</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipTopRow}>
            <Text style={styles.tipCategory}>{activeTip.category} tip</Text>
            <Pressable accessibilityRole="button" onPress={rotateTip} style={styles.smallGhostButton}>
              <Text style={styles.smallGhostButtonText}>Next tip</Text>
            </Pressable>
          </View>
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
          {activeTab === 'Home' && (
            <HomeScreen
              avatar={avatar}
              equippedItem={equippedItem}
              dailyApprovedCount={dailyApprovedCount}
              weeklyApprovedCount={weeklyApprovedCount}
              streak={streak}
              streakMultiplier={streakMultiplier}
              submissions={submissions}
              approvedTaskIds={approvedTaskIds}
              onCreateSubmission={createSubmission}
              onApproveSubmission={approveSubmission}
              onSendToReview={sendToReview}
            />
          )}
          {activeTab === 'Onboarding' && <OnboardingScreen avatar={avatar} onUpdateAvatar={updateAvatar} />}
          {activeTab === 'Feed' && <FeedScreen feedPosts={feedPosts} onReact={reactToPost} />}
          {activeTab === 'Map' && <MapScreen privacy={avatar.privacy} feedCount={feedPosts.length} />}
          {activeTab === 'Shop' && (
            <ShopScreen
              pointBalance={pointBalance}
              ownedItemIds={ownedItemIds}
              equippedItemId={equippedItemId}
              onPurchaseOrEquip={purchaseOrEquip}
            />
          )}
          {activeTab === 'Profile' && (
            <ProfileScreen
              avatar={avatar}
              pointBalance={pointBalance}
              streak={streak}
              categoryStats={categoryStats}
              approvedSubmissions={approvedSubmissions}
              ledger={ledger}
              equippedItem={equippedItem}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({
  avatar,
  equippedItem,
  dailyApprovedCount,
  weeklyApprovedCount,
  streak,
  streakMultiplier,
  submissions,
  approvedTaskIds,
  onCreateSubmission,
  onApproveSubmission,
  onSendToReview,
}: {
  avatar: AvatarProfile;
  equippedItem: WardrobeItem;
  dailyApprovedCount: number;
  weeklyApprovedCount: number;
  streak: number;
  streakMultiplier: number;
  submissions: Submission[];
  approvedTaskIds: Set<string>;
  onCreateSubmission: (task: EcoTask) => void;
  onApproveSubmission: (submissionId: string) => void;
  onSendToReview: (submissionId: string) => void;
}) {
  return (
    <>
      <AvatarSummary avatar={avatar} equippedItem={equippedItem} />
      <Section title="Today" subtitle="Complete any 3 tasks to activate the streak multiplier.">
        <ProgressCard
          dailyApprovedCount={dailyApprovedCount}
          weeklyApprovedCount={weeklyApprovedCount}
          streak={streak}
          streakMultiplier={streakMultiplier}
        />
        {dailyTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            completed={approvedTaskIds.has(task.id)}
            onCreateSubmission={onCreateSubmission}
          />
        ))}
      </Section>
      <Section title="Weekly bonus missions" subtitle="Harder challenges enter review before points are credited.">
        {weeklyChallenges.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            completed={approvedTaskIds.has(task.id)}
            onCreateSubmission={onCreateSubmission}
          />
        ))}
      </Section>
      <Section title="Photo verification queue" subtitle="This mock queue stands in for camera upload, AI screening, and moderation.">
        {submissions.length === 0 ? (
          <EmptyState text="No submissions yet. Start a task above to create mock photo evidence." />
        ) : (
          submissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onApprove={onApproveSubmission}
              onSendToReview={onSendToReview}
            />
          ))
        )}
      </Section>
    </>
  );
}

function OnboardingScreen({ avatar, onUpdateAvatar }: { avatar: AvatarProfile; onUpdateAvatar: (field: keyof AvatarProfile, value: string) => void }) {
  return (
    <>
      <Section title="Character creator" subtitle="Interactive first-run choices for identity, starter outfit, and privacy.">
        <View style={styles.creatorLayout}>
          <AvatarPreview label={avatar.outfit} />
          <View style={styles.creatorCopy}>
            <Text style={styles.inputLabel}>Avatar name</Text>
            <TextInput
              accessibilityLabel="Avatar name"
              value={avatar.name}
              onChangeText={(value) => onUpdateAvatar('name', value)}
              placeholder="Name your avatar"
              style={styles.textInput}
            />
            <Text style={styles.mutedText}>Saved locally in this prototype. Production will persist this to the user profile.</Text>
          </View>
        </View>
      </Section>
      <ChoiceSection title="Avatar base" value={avatar.base} options={avatarBases} onChoose={(value) => onUpdateAvatar('base', value)} />
      <ChoiceSection title="Representation" value={avatar.representation} options={representationOptions} onChoose={(value) => onUpdateAvatar('representation', value)} />
      <ChoiceSection title="Starter outfit" value={avatar.outfit} options={starterOutfits} onChoose={(value) => onUpdateAvatar('outfit', value)} />
      <ChoiceSection title="Location precision" value={avatar.privacy} options={privacyOptions} onChoose={(value) => onUpdateAvatar('privacy', value)} />
    </>
  );
}

function FeedScreen({ feedPosts, onReact }: { feedPosts: FeedPost[]; onReact: (postId: string) => void }) {
  return (
    <Section title="Local community feed" subtitle="Approved submissions become neighborhood posts with leaf reactions.">
      {feedPosts.map((post) => (
        <FeedCard key={post.id} post={post} onReact={onReact} />
      ))}
    </Section>
  );
}

function MapScreen({ privacy, feedCount }: { privacy: string; feedCount: number }) {
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
        <InfoRow label="Current setting" value={privacy} />
        <InfoRow label="Visible posts" value={`${feedCount}`} />
        <Text style={styles.bodyText}>
          Exact coordinates should only be stored for consented verification. Public feed and map responses should use neighborhood, city, or aggregated hotspot buckets.
        </Text>
      </Section>
    </>
  );
}

function ShopScreen({
  pointBalance,
  ownedItemIds,
  equippedItemId,
  onPurchaseOrEquip,
}: {
  pointBalance: number;
  ownedItemIds: string[];
  equippedItemId: string;
  onPurchaseOrEquip: (item: WardrobeItem) => void;
}) {
  return (
    <Section title="Wardrobe shop" subtitle="Cosmetics are earned with eco-points, with no real-money purchases.">
      <View style={styles.shopPreview}>
        <AvatarPreview compact label="Preview" />
        <View style={styles.shopBalance}>
          <Text style={styles.progressTitle}>Spendable balance: {pointBalance.toLocaleString()}</Text>
          <Text style={styles.bodyText}>Unlock and equip local wardrobe items. A production build can replace this preview with VRM, Unity, or Ready Player Me.</Text>
        </View>
      </View>
      {wardrobeItems.map((item) => (
        <ShopItem
          key={item.id}
          item={item}
          owned={ownedItemIds.includes(item.id)}
          equipped={equippedItemId === item.id}
          affordable={pointBalance >= item.cost}
          onPurchaseOrEquip={onPurchaseOrEquip}
        />
      ))}
    </Section>
  );
}

function ProfileScreen({
  avatar,
  pointBalance,
  streak,
  categoryStats,
  approvedSubmissions,
  ledger,
  equippedItem,
}: {
  avatar: AvatarProfile;
  pointBalance: number;
  streak: number;
  categoryStats: { label: TaskCategory; value: number }[];
  approvedSubmissions: Submission[];
  ledger: PointLedgerEntry[];
  equippedItem: WardrobeItem;
}) {
  return (
    <>
      <Section title="Profile stats" subtitle="Progress, badges, and approved submission gallery.">
        <View style={styles.profileHero}>
          <AvatarPreview compact label={equippedItem.name} />
          <View style={styles.avatarSummaryText}>
            <Text style={styles.sectionTitle}>{avatar.name || 'Eco Scout'}</Text>
            <Text style={styles.bodyText}>{avatar.base} - {avatar.representation}</Text>
            <Text style={styles.mutedText}>Privacy: {avatar.privacy}</Text>
          </View>
        </View>
        <View style={styles.statsGrid}>
          <StatCard label="Points" value={pointBalance.toLocaleString()} />
          <StatCard label="Streak" value={`${streak} days`} />
          <StatCard label="Tasks" value={`${approvedSubmissions.length}`} />
          <StatCard label="Badges" value={`${badges.length}`} />
        </View>
      </Section>
      <Section title="Category breakdown" subtitle="Counts update as mock submissions are approved.">
        {categoryStats.map((stat) => (
          <InfoRow key={stat.label} label={`${stat.label} tasks`} value={`${stat.value}`} />
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
      <Section title="Point ledger" subtitle="Audit-style point history for task approvals and shop unlocks.">
        {ledger.slice(0, 5).map((entry) => (
          <InfoRow key={entry.id} label={entry.label} value={`${entry.points > 0 ? '+' : ''}${entry.points}`} />
        ))}
      </Section>
    </>
  );
}

function ProgressCard({
  dailyApprovedCount,
  weeklyApprovedCount,
  streak,
  streakMultiplier,
}: {
  dailyApprovedCount: number;
  weeklyApprovedCount: number;
  streak: number;
  streakMultiplier: number;
}) {
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Daily progress</Text>
        <Text style={styles.progressValue}>{dailyApprovedCount} of 3</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(dailyApprovedCount / 3, 1) * 100}%` }]} />
      </View>
      <Text style={styles.mutedText}>Current streak: {streak} days. Active multiplier: {streakMultiplier.toFixed(1)}x. Weekly approvals: {weeklyApprovedCount}.</Text>
    </View>
  );
}

function AvatarSummary({ avatar, equippedItem }: { avatar: AvatarProfile; equippedItem: WardrobeItem }) {
  return (
    <View style={styles.avatarSummary}>
      <AvatarPreview compact label={equippedItem.name} />
      <View style={styles.avatarSummaryText}>
        <Text style={styles.sectionTitle}>{avatar.name || 'Eco Scout'}</Text>
        <Text style={styles.bodyText}>{avatar.outfit} with {equippedItem.name} equipped.</Text>
        <Text style={styles.mutedText}>Location sharing: {avatar.privacy}.</Text>
      </View>
    </View>
  );
}

function AvatarPreview({ compact = false, label }: { compact?: boolean; label: string }) {
  return (
    <View style={[styles.avatarStage, compact && styles.avatarStageCompact]} accessibilityLabel="Stylized avatar preview placeholder">
      <View style={styles.avatarHead} />
      <View style={styles.avatarBody} />
      <View style={styles.avatarPlatform} />
      <Text style={styles.avatarLabel}>{label}</Text>
    </View>
  );
}

function ChoiceSection({ title, value, options, onChoose }: { title: string; value: string; options: string[]; onChoose: (value: string) => void }) {
  return (
    <Section title={title} subtitle={`Selected: ${value}`}>
      <View style={styles.choiceWrap}>
        {options.map((option) => (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected: option === value }}
            onPress={() => onChoose(option)}
            style={[styles.choicePill, option === value && styles.choicePillActive]}
          >
            <Text style={[styles.choiceText, option === value && styles.choiceTextActive]}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </Section>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

function TaskCard({ task, completed, onCreateSubmission }: { task: EcoTask; completed: boolean; onCreateSubmission: (task: EcoTask) => void }) {
  return (
    <View style={[styles.card, completed && styles.cardComplete]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleBlock}>
          <Text style={styles.cardTitle}>{task.title}</Text>
          <Text style={styles.cardMeta}>{task.category} - {task.cadence} - {task.difficulty}</Text>
        </View>
        <Text style={styles.pointReward}>+{task.points}</Text>
      </View>
      <Text style={styles.bodyText}>{task.evidencePrompt}</Text>
      <Text style={styles.mutedText}>Safety: {task.safetyNote}</Text>
      <Pressable
        style={[styles.primaryButton, completed && styles.disabledButton]}
        accessibilityRole="button"
        disabled={completed}
        onPress={() => onCreateSubmission(task)}
      >
        <Text style={styles.primaryButtonText}>{completed ? 'Approved' : 'Create mock photo submission'}</Text>
      </Pressable>
    </View>
  );
}

function SubmissionCard({
  submission,
  onApprove,
  onSendToReview,
}: {
  submission: Submission;
  onApprove: (submissionId: string) => void;
  onSendToReview: (submissionId: string) => void;
}) {
  const approved = submission.status === 'Approved';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleBlock}>
          <Text style={styles.cardTitle}>{submission.taskTitle}</Text>
          <Text style={styles.cardMeta}>{submission.category} - {submission.createdAt}</Text>
        </View>
        <Text style={[styles.statusText, approved && styles.statusApproved]}>{submission.status}</Text>
      </View>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>Mock evidence image</Text>
      </View>
      <Text style={styles.bodyText}>{submission.evidenceNote}</Text>
      {!approved && (
        <View style={styles.actionRow}>
          <Pressable style={[styles.secondaryButton, styles.actionButton]} accessibilityRole="button" onPress={() => onSendToReview(submission.id)}>
            <Text style={styles.secondaryButtonText}>Flag for review</Text>
          </Pressable>
          <Pressable style={[styles.primaryButton, styles.actionButton]} accessibilityRole="button" onPress={() => onApprove(submission.id)}>
            <Text style={styles.primaryButtonText}>Approve</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function FeedCard({ post, onReact }: { post: FeedPost; onReact: (postId: string) => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.feedIdentity}>
          <View style={styles.feedAvatar} />
          <View>
            <Text style={styles.cardTitle}>{post.avatarName}</Text>
            <Text style={styles.cardMeta}>{post.distance} - {post.neighborhood} - {post.createdAt}</Text>
          </View>
        </View>
        <Text style={styles.statusApproved}>{post.moderationStatus}</Text>
      </View>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>{post.category} photo</Text>
      </View>
      <Text style={styles.cardTitle}>{post.taskTitle}</Text>
      <Text style={styles.bodyText}>{post.description}</Text>
      <Pressable style={styles.secondaryButton} accessibilityRole="button" onPress={() => onReact(post.id)}>
        <Text style={styles.secondaryButtonText}>Leaf reaction - {post.reactions}</Text>
      </Pressable>
    </View>
  );
}

function ShopItem({
  item,
  owned,
  equipped,
  affordable,
  onPurchaseOrEquip,
}: {
  item: WardrobeItem;
  owned: boolean;
  equipped: boolean;
  affordable: boolean;
  onPurchaseOrEquip: (item: WardrobeItem) => void;
}) {
  const disabled = !owned && !affordable;
  const label = equipped ? 'Equipped' : owned ? 'Equip' : affordable ? `${item.cost} pts` : 'Need points';

  return (
    <View style={styles.shopItem}>
      <View style={styles.cardTitleBlock}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardMeta}>{item.category} - {item.rarity}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        disabled={disabled || equipped}
        onPress={() => onPurchaseOrEquip(item)}
        style={[styles.shopCostPill, disabled && styles.disabledPill, equipped && styles.equippedPill]}
      >
        <Text style={styles.shopCostText}>{label}</Text>
      </Pressable>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.mutedText}>{text}</Text>
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
  tipTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  smallGhostButton: {
    backgroundColor: '#D8F3DC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  smallGhostButtonText: {
    color: '#1B4332',
    fontSize: 12,
    fontWeight: '800',
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
  profileHero: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    flexDirection: 'row',
    marginBottom: 12,
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
    height: 196,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 150,
  },
  avatarStageCompact: {
    borderRadius: 22,
    height: 126,
    width: 100,
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
  avatarLabel: {
    color: '#1B4332',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8F3DC',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  cardComplete: {
    borderColor: '#52B788',
    borderWidth: 2,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitleBlock: {
    flex: 1,
    paddingRight: 8,
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
    marginTop: 6,
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
  disabledButton: {
    backgroundColor: '#95D5B2',
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
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
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
  inputLabel: {
    color: '#0B2E1F',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F4FBF7',
    borderColor: '#95D5B2',
    borderRadius: 14,
    borderWidth: 1,
    color: '#0B2E1F',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  choiceWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  choicePill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBE8D7',
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  choicePillActive: {
    backgroundColor: '#1B4332',
    borderColor: '#1B4332',
  },
  choiceText: {
    color: '#1B4332',
    fontSize: 13,
    fontWeight: '800',
  },
  choiceTextActive: {
    color: '#FFFFFF',
  },
  feedIdentity: {
    alignItems: 'center',
    flex: 1,
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
    color: '#B7791F',
    fontSize: 12,
    fontWeight: '800',
  },
  statusApproved: {
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
    paddingVertical: 9,
  },
  disabledPill: {
    backgroundColor: '#E5E7EB',
  },
  equippedPill: {
    backgroundColor: '#95D5B2',
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
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    paddingRight: 8,
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
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
});
