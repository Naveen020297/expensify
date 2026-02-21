import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { useSharedDaySummaryStore } from '@src/store/sharedDaySummaryStore';
import { apiClient } from '@src/services/apiClient';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<SharedStackParamList, 'GroupList'>;

interface Group {
  id: string;
  name: string;
  memberCount: number;
}

export const GroupListScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/groups');
      if (response.data?.success) {
        setGroups(response.data.data.map((g: any) => ({
          id: g.id,
          name: g.name,
          memberCount: g.members?.length || 0
        })));
      }
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchGroups();
    }
  }, [isFocused]);

  const today = new Date().toISOString().slice(0, 10);
  const totalsByGroupAndDate = useSharedDaySummaryStore(
    (s) => s.totalsByGroupAndDate
  );

  const handleCreateGroup = () => {
    navigation.navigate('GroupForm', undefined);
  };

  const handleOpenGroup = (group: Group) => {
    navigation.navigate('SharedCategory', {
      groupId: group.id,
      groupName: group.name
    });
  };

  const handleEditGroupMembers = (group: Group) => {
    navigation.navigate('GroupForm', { groupId: group.id });
  };

  const handleOpenReport = (group: Group) => {
    navigation.navigate('SharedReport', {
      groupId: group.id,
      groupName: group.name
    });
  };

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Your groups</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Select a group to add shared expenses or review who owes whom.
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.groupCard,
              { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }
            ]}
            onPress={() => handleOpenGroup(item)}
          >
            <View style={styles.groupInfo}>
              <Text style={[styles.groupName, { color: theme.colors.textPrimary }]}>{item.name}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                {item.memberCount} members
              </Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                Today&apos;s total: ₹{' '}
                {(
                  totalsByGroupAndDate[`${item.id}:${today}`] ?? 0
                ).toFixed(2)}
              </Text>
              <View style={styles.groupLinks}>
                <TouchableOpacity onPress={() => handleEditGroupMembers(item)}>
                  <Text style={{ color: theme.colors.primary, fontSize: 12 }}>Edit members</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title="Report"
              variant="secondary"
              onPress={() => handleOpenReport(item)}
            />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <Button title="Create new group" onPress={handleCreateGroup} />
        }
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={fetchGroups}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13
  },
  list: {
    paddingVertical: 16,
    paddingBottom: 24
  },
  groupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500'
  },
  groupInfo: {
    flex: 1,
    marginRight: 12
  },
  groupLinks: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 12
  }
});

