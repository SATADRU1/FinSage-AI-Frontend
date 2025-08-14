import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const services = [
    {
      icon: 'trending-up',
      title: 'Investment Planning',
      description: 'Detailed investment strategies aligned with your goals and risk tolerance.',
    },
    {
      icon: 'bar-chart',
      title: 'Stock Trading',
      description: 'Expert guidance on stock market investments and portfolio management.',
    },
    {
      icon: 'home',
      title: 'Real Estate',
      description: 'Comprehensive real estate investment strategies and market analysis.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#1e1e2e', '#2d2d3d']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Invest. Grow.{'\n'}Achieve.
          </Text>
          <Text style={styles.heroSubtitle}>
            Your trusted partner in financial growth and success
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <LinearGradient
                colors={['#6d28d9', '#8b5cf6']}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Start Investing</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Ionicons name={service.icon} size={32} color="#fff" />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact Section */}
      <LinearGradient
        colors={['#2d2d3d', '#1e1e2e']}
        style={styles.contactSection}
      >
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={24} color="#8b5cf6" />
            <Text style={styles.contactText}>info@financialadvisor.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={24} color="#8b5cf6" />
            <Text style={styles.contactText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location" size={24} color="#8b5cf6" />
            <Text style={styles.contactText}>123 Finance St, New York, NY</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
  },
  heroSection: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.9,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
  primaryButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  servicesSection: {
    padding: 32,
    backgroundColor: '#2d2d3d',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  servicesGrid: {
    gap: 24,
  },
  serviceCard: {
    backgroundColor: '#3d3d4d',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6d28d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  contactSection: {
    padding: 32,
  },
  contactInfo: {
    gap: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
});