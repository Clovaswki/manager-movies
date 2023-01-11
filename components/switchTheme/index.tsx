import { Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actionChangeTheme } from '../../store/actions/theme';
import { Dispatch } from 'redux';

type Props = {
    theme: string,
    dispatch: Dispatch, 
    position?: string 
}

const SwitchTheme: React.FC<Props> = ({theme, dispatch, position}) => {
    
    const [themeSelect, setThemeSelect] = useState<boolean>(false)
    
    useEffect(() => {
        setThemeSelect(theme === 'light')
    }, [theme])
    
    const changeTheme = () => {
        
        if(themeSelect){
            dispatch(actionChangeTheme('dark'))
            setThemeSelect(false)
        }else{
            dispatch(actionChangeTheme('light'))
            setThemeSelect(true)
        }

    };

    return (
        <div 
            style={
                {position: (position || 'absolute') as any, right: '1%', top: '3%'}
            }
        >
            <Switch onChange={() => changeTheme()} checked={themeSelect} />
        </div>
    )
}

const mapPropsToState = (state: any) => ({
    theme: state.theme
})

export default connect(mapPropsToState)(SwitchTheme)