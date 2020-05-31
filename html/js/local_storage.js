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
};