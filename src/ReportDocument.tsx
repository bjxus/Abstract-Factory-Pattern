import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
// import { Theme } from './domain/model/Theme';

// Estilos condicionales basados en el tema
const styles = (theme: string) => StyleSheet.create({
  document: {
    width: 100,
    height: 800,
  },
  page: {
    flexDirection: 'column',
    backgroundColor: theme === 'DARK' ? '#1a1a1a' : '#ffffff',
    padding: 30,
    fontSize: 12,
    color: theme === 'DARK' ? '#ffffff' : '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme === 'DARK' ? '#404040' : '#e0e0e0',
    paddingBottom: 15,
  },
  logo: {
    width: 100,
    height: 40,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'DARK' ? '#ffffff' : '#2c3e50',
  },
  section: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: theme === 'DARK' ? '#2d2d2d' : '#f8f9fa',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: theme === 'DARK' ? '#90caf9' : '#2c3e50',
    fontSize: 10,
    padding: 5,
  }
,  
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme === 'DARK' ? '#90caf9' : '#2c3e50',
  }
});

interface ReportDocumentProps {
  includeLogo?: boolean;
  title: string;
  includePaymentDetails?: boolean;
  includeUserInfo?: boolean;
  theme: string;
  includeTimestamp?: boolean;
  footerMessage?: string;
  format: 'A4' | 'LETTER';
  
  paymentDetails?: {
    transactionId: string;
    type: string;
    amount: number;
  };
  userInfo?: {
    nameUser: string;
    email: string;
    phone: string;
  };
}

// type ReportDocumentStateOptional = ;

const ReportDocument: React.FC<ReportDocumentProps> = ({
  includeLogo,
  title,
  includePaymentDetails,
  includeUserInfo,
  theme,
  includeTimestamp,
  footerMessage,
  format,
  paymentDetails,
  userInfo,
}) => {

 
  const currentStyles = styles(theme);

  return (
    <Document>
      <Page size={format} style={currentStyles.page}>
        {/* Header */}
        <View style={currentStyles.header}>
          {includeLogo && (
            <Image
              src={`${theme === 'DARK' ? '/colorful-digital-payment-logo-vector.jpg' : '/colorful-digital-payment-logo-vector-dark.jpg' }`}
              style={currentStyles.logo}
            />
          )}
          <Text style={currentStyles.title}>{title}</Text>
        </View>

        {/* Detalles de pago */}
        {includePaymentDetails && paymentDetails && (
          <View style={currentStyles.section}>
            <Text style={currentStyles.label}>Detalles de pago:</Text>
            <Text>Transacción: {paymentDetails.transactionId}</Text>
            <Text>Tipo de pago: {paymentDetails.type}</Text>
            <Text>Monto: ${paymentDetails.amount}</Text>
          </View>
        )}

        {/* Información del usuario */}
        {includeUserInfo && userInfo && (
          <View style={currentStyles.section}>
            <Text style={currentStyles.label}>Información del usuario:</Text>
            <Text>Nombre: {userInfo.nameUser}</Text>
            <Text>Email: {userInfo.email}</Text>
            <Text>Teléfono: {userInfo.phone}</Text>
          </View>
        )}

        {/* Fecha y hora */}
        {includeTimestamp && (
          <View style={currentStyles.section}>
            <Text>Generado el: {new Date().toLocaleString()}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={currentStyles.footer}>
          {footerMessage || 'Reporte generado automáticamente'}
        </Text>
      </Page>
    </Document>
  );
};

export default ReportDocument;