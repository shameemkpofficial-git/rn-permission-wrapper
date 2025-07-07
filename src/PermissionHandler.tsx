import React, { useEffect, useState } from 'react';
import { View, Modal, Text, Button, Platform, Linking, StyleSheet } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import type { Permission } from 'react-native-permissions';


type PermissionType = 'camera' | 'location' | 'photo' | 'notification';

interface PermissionHandlerProps {
  type: PermissionType;
  children: React.ReactNode;
}

const getPermissionByType = (type: PermissionType): Permission | undefined => {
    const isIOS = Platform.OS === 'ios';
  
    switch (type) {
      case 'camera':
        return isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  
      case 'location':
        return isIOS
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  
      case 'photo':
        return isIOS
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  
      default:
        return undefined;
    }
  };
  

const PermissionHandler: React.FC<PermissionHandlerProps> = ({ type, children }) => {
  const [isGranted, setIsGranted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const permission = getPermissionByType(type);

  const checkPermission = async () => {
    const permission = getPermissionByType(type);
  
    if (!permission) {
      console.warn('Invalid permission type provided:', type);
      return;
    }
  
    const result = await check(permission);
  
    if (result === RESULTS.GRANTED) {
      setIsGranted(true);
    } else if (result === RESULTS.DENIED) {
      const req = await request(permission);
      if (req === RESULTS.GRANTED) {
        setIsGranted(true);
      } else if (req === RESULTS.BLOCKED) {
        setIsBlocked(true);
      }
    } else if (result === RESULTS.BLOCKED) {
      setIsBlocked(true);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  if (isGranted) return <>{children}</>;

  return (
    <Modal transparent visible={isBlocked} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Permission Required</Text>
          <Text style={styles.message}>
            This feature needs access to your {type}. Please allow it from settings.
          </Text>
          <Button title="Open Settings"onPress={() => openSettings()}/>
        </View>
      </View>
    </Modal>
  );
};

export default PermissionHandler;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000077',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    marginBottom: 15,
  },
});
