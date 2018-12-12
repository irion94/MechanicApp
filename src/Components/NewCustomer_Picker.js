import * as React from 'react'

class NewCustomer_Picker extends React.Component<Props> {
    state = {
        search: '',
        selected: undefined,
        selectedPrimaryKey: '',
    };


    render() {
        const { navigation } = this.props;
        return navigation.getParam('component')
    }
}

export default NewCustomer_Picker
