/**
 * Created by ced on 31/05/2020.
 */

class LsManager{

    static get_value( object_name, variable_name ){
        var _data = localStorage.getItem( object_name );

        if ( _data ) {
            _data = JSON.parse(_data);

            return _data[ variable_name ];
        }
    }

    static set_value( object_name, variable_name, value ){
        var _data = localStorage.getItem( object_name );

        if ( _data ) {
            _data = JSON.parse(_data);
        }
        else {
            _data = {};
        }

        _data[ variable_name ] = value;
        _data = JSON.stringify(_data);

        localStorage.setItem( object_name, _data );
    }

    static get_selected_items( object_name ) {
        var _data = localStorage.getItem(object_name);

        if (_data) {
            _data = JSON.parse(_data);

            var result = [];

            for (let [key, value] of Object.entries(_data)) {
                if( value ){
                    result.push( key )
                }
            }

            return result;
        }
        else
        {
            return [];
        }
    }

    static get_unselected_items( object_name ) {
        var _data = localStorage.getItem(object_name);

        if (_data) {
            _data = JSON.parse(_data);

            var result = [];

            for (let [key, value] of Object.entries(_data)) {
                if( !value ){
                    result.push( key )
                }
            }

            return result;
        }
        else
        {
            return [];
        }
    }

};