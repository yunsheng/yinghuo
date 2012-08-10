Ext.define('Writer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',
    requires: ['Ext.form.field.Text'],
    initComponent: function(){
        this.addEvents('create');
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: '��Ϣ�༭',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '50%',
                labelAlign: 'right'
            },
            items: [
            {
                fieldLabel: 'Name',
                name: 'name',
                allowBlank: false
            },{
                fieldLabel: 'Tel',
                name: 'tel',
                allowBlank: true
            },{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank: true,
                vtype: 'email'
            }, {
                fieldLabel: 'QQ',
                name: 'qq',
                allowBlank: true
            }, {
                fieldLabel: '��ע',
                name: 'bz',
                allowBlank: true
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function(record){
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();

        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        }
    },

    onCreate: function(){
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function(){
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('Writer.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'tbtext',
                    text: '<b>ѡ��</b>'
                }, '��', {
                    text: '�Զ�����',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: '������',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'ѡ�е�ǰ״̬�󣬻�һ���ύ�����޸Ĺ������ݣ�����������δ���Ĳ��֣����Ƽ���ѡ',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'ȫ���ύ',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'ѡ�е�ǰ״̬�󣬻��ύ�������ݣ�����δ���Ĳ��֣����Ƽ���ѡ',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'Name',
                flex: 1,
                width:200,
                sortable: true,
                dataIndex: 'name',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Tel',
                flex: 1,
                width:200,
                sortable: true,
                dataIndex: 'tel',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Email',
                flex: 1,
                width:200,
                sortable: true,
                dataIndex: 'email',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'QQ',
                width: 100,
                sortable: true,
                dataIndex: 'qq',
                field: {
                    type: 'textfield'
                }
            }, {
                header: '��ע',
                width: 500,
                sortable: true,
                dataIndex: 'bz',
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
        this.store.sync();
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        var rec = new Writer.Person({
            first: '',
            last: '',
            email: ''
        }), edit = this.editing;

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: 0,
            column: 1
        });
    }
});

Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'name','tel', 'email', 'qq','bz'],
    validations: [{
        type: 'length',
        field: 'email',
        min: 1
    }, {
        type: 'length',
        field: 'tel',
        min: 11,
        max:11
    }, {
        type: 'length',
        field: 'last',
        min: 1
    }]
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);

Ext.onReady(function(){
    Ext.tip.QuickTipManager.init();
    var store = Ext.create('Ext.data.Store', {
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'ajax',
            api: {
                read: 'data/get.php',
                create: 'data/add.php',
                update: 'data/update.php',
                destroy: 'data/del.php'
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                root: 'data'
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        listeners: {
            write: function(proxy, operation){
                if (operation.action == 'destroy') {
                    main.child('#form').setActiveRecord(null);
                }
              Ext.MessageBox.show({title:operation.action, msg:operation.resultSet.message});
                // Ext.MessageBox.show({title:operation.action, msg:"����ʧ��"});
            }
        }
    });

    var main = Ext.create('Ext.container.Container', {
        // padding: '0 0 0 20',
        width: "100%",
        height: 750,
        renderTo: document.body,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            itemId: 'grid',
            xtype: 'writergrid',
            title: '��ϵ��',
            flex: 1,
            height:500,
            store: store,
            listeners: {
                selectionchange: function(selModel, selected) {
                    main.child('#form').setActiveRecord(selected[0] || null);
                }
            }
        },{
            itemId: 'form',
            xtype: 'writerform',
            height: 250,
            // margins: '0 0 10 0',
            listeners: {
                create: function(form, data){
                    store.insert(0, data);
                }
            }
        }]
    });
});
