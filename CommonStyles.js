import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    defaultWrapper: {
        backgroundColor: "#02071E",
        flex: 1
    },
    title: {
        fontSize: 23,
        marginBottom: 20,
        color: 'rgba(243, 243, 243, 0.9)',
        fontWeight: 'bold',
        letterSpacing: 0.37,
        paddingTop: 20,
    },
    text: {
        fontSize: 18,
        color: 'rgba(243, 243, 243, 0.9)',
        fontWeight: 'bold',
        letterSpacing: 0.37,
        paddingBottom: 20,
    },
    smallText: {
        fontSize: 15,
        color: 'rgba(243, 243, 243, 0.9)',
        fontWeight: 'normal',
        paddingBottom: 20,
    },
    quizWrapper: {
        backgroundColor: "#02071E",
        flex: 1,
        justifyContent: 'space-between',
    },
    quizContainerRounded: {
        backgroundColor: '#1E1E32',
        flex: 1,
        borderStartStartRadius: 24,
        borderStartEndRadius: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF33',
        padding: 16
    },
    quizContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF33',
        padding: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

export default commonStyles;