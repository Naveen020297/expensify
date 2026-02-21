import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '@src/navigation/AppNavigator';
import { ScreenContainer, Button, TextField } from '@src/components/ui';
import { useTheme } from '@src/theme/ThemeContext';
import { apiClient } from '@src/services/apiClient';
import { useAuthStore } from '@src/store/authStore';

type Props = NativeStackScreenProps<SharedStackParamList, 'GroupForm'>;

interface User {
  id: string;
  name: string;
  email: string;
}

export const GroupFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { groupId } = route.params || {};
  const isEditing = !!groupId;
  const theme = useTheme();
  const currentUser = useAuthStore(s => s.user);
  const [name, setName] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isEditing) {
      const fetchGroup = async () => {
        try {
          const response = await apiClient.get(`/groups/${groupId}`);
          if (response.data?.success) {
            const group = response.data.data;
            setName(group.name);
            setSelectedIds(group.members.map((m: any) => m.userId));
            setUsers(group.members.map((m: any) => m.user).filter(Boolean));
          }
        } catch (error) {
          console.error('Failed to fetch group:', error);
          Alert.alert('Error', 'Failed to load group details');
        }
      };
      fetchGroup();
    }
  }, [isEditing, groupId]);

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await apiClient.get(`/users/search?query=${searchQuery}`);
          if (response.data?.success) {
            setUsers(response.data.data.filter((u: any) => u.id !== currentUser?.id));
          }
        } catch (error) {
          console.error('Search failed:', error);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleMember = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (!name) {
        throw new Error('Please enter a group name');
      }

      if (isEditing) {
        await apiClient.patch(`/groups/${groupId}/members`, {
          members: selectedIds.map(userId => ({ userId, isActive: true }))
        });
        Alert.alert('Success', 'Group members updated');
      } else {
        await apiClient.post('/groups', {
          name,
          memberIds: selectedIds
        });
        Alert.alert('Success', 'Group created successfully');
      }

      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || err.message || 'Failed to save group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {isEditing ? 'Edit group' : 'New group'}
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        {isEditing
          ? 'Update the members of your group.'
          : 'Give your apartment or shared home a name and select who is part of it.'}
      </Text>

      <TextField
        label="Group name"
        value={name}
        onChangeText={setName}
        editable={!isEditing}
      />

      <TextField
        label="Search members by name or email"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Type at least 3 characters..."
      />

      <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
        {searchQuery.length > 2 ? 'Search Results' : 'Selected Members'}
      </Text>

      <FlatList
        data={searchQuery.length > 2 ? users : users.filter(u => selectedIds.includes(u.id))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const selected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.memberRow,
                {
                  borderColor: theme.colors.border,
                  backgroundColor: selected ? theme.colors.surfaceElevated : theme.colors.surface
                }
              ]}
              onPress={() => toggleMember(item.id)}
            >
              <View>
                <Text style={{ color: theme.colors.textPrimary }}>{item.name}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>
                  {item.email}
                </Text>
              </View>
              <Text style={{ color: theme.colors.primary }}>{selected ? 'Selected' : 'Tap to add'}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.list}
      />

      <Button
        title={isEditing ? 'Save changes' : 'Save group'}
        onPress={handleSave}
        loading={loading}
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
  sectionLabel: {
    marginTop: 16,
    fontSize: 13
  },
  list: {
    paddingVertical: 8,
    paddingBottom: 16
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8
  }
});

