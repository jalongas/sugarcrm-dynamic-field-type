({
    events: {
        'change [name="billing_address_city"]': 'traceEvent'
    },
    extendsFrom: 'EnumField',
    initialize: function(options){
        this._super('initialize', [options]);
        this.model.on('change:billing_address_country', this._renderField, this);
        this._renderField();
    },
    traceEvent: function(){
        this.model.set('billing_address_city', $('input[name="billing_address_city"]').val());
        console.log(this.model.get('billing_address_city'));
    },
    _renderField: function(){
        console.log('Country Changed to Value: ' + this.model.get('billing_address_country'));
        
        this.def.isEnumField = true;
        this.def.options = app.lang.getAppListStrings('countries_dom');
        this.type = 'enum';
        this.def.type = 'enum';
        this.def.items = [];
        
        if(this.model.get('billing_address_country') != 'ES'){
            this.def.isEnumField = false;
            this.def.options = {};
            this.type = 'text';
            this.def.type = 'text';
        }
        this._render();
        this.model.on('change:billing_address_city', this.traceEvent, this);
    },
    _dispose: function(){
        this._super('_dispose');
    }
})