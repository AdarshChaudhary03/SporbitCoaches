import React from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Academy from '../components/subscriptionDetails/academy';
import Faq from '../settings/components/helpAndSupport/faq';
import CustomerSupport from '../settings/components/helpAndSupport/customerSupport';
import PrivacyPolicy from '../settings/components/helpAndSupport/privacyPolicy';
import RefundPolicy from '../settings/components/helpAndSupport/refundPolicy';
import TermsAndConditions from '../settings/components/helpAndSupport/termsAndConditions';

export default function HelpAndSupportDetails(props) {
    console.log('detail'); 
    const {detail} = props.route.params;
  switch (detail) {
    case 'faq':
      return <Faq />;
    case 'customer':
      return <CustomerSupport />;
    case 'privacy':
      return <PrivacyPolicy />;
    case 'refund':
      return <RefundPolicy />;
    case 'terms':
      return <TermsAndConditions />;
  }
}
