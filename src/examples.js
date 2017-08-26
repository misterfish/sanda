process.exit (1)

//  @dep ifFunction
//  @dep bind

if (obj.speak) obj.speak()

whenOk__ (
    bindTry (obj, 'speak'),
    invoke,
)

whenOk__ (
    bindTry (obj, 'speak'),
    x => x ()
)

bindTry (obj, 'speak') | whenOk (invoke)
whenBind (obj, 'speak') | invoke
invokeWhenBind (obj, 'speak')
whenBindInvoke (obj, 'speak')
invokeIfCan (obj, 'speak')
whenCanInvoke (obj, 'speak') // no

bindTry (obj, 'speak') | invokeIfOk

if (this.parseFormData) formData = this.parseFormData(formData);
// first make immutable:

if (this.parseFormData)
    newFormData = this.parseFormData(formData);

// const newFormData = invokeIfCan (this, 'parseFormData', formData, ... else ??)

const newFormData_1 = bindTry (this, 'parseFormData') | ifOk (
    invoke,
    () => formData,
)

const newFormData_2 = [this, 'parseFormData'] | whenBind (invoke1 (formData))

// nooo
// const newFormData = bindTry (this, 'parseFormData') | ifOk (
//     invoke,
//     < formData
// )

const newFormData_3 = bindTry (this, 'parseFormData') | invoke1IfOk (formData)

if(this.model){
  this.model.set(this.serializeForm());
}

bindTry (this, 'model') | whenOk (
  it => it.set (this.serializeForm())
)

bindTry (this, 'model') | whenOk (
  dot1 ('set', (this.serializeForm()))
)

/*
if (this.startupCallback) {
    this.startupCallback();
}

this.startupCallback
| ifOk (callOn (this))

this.startupCallback
| ifOk (call (this))

ifOk__ (
    this.startupCallback,
    f => f.call (this),
)

ifOk__ (
    this.startupCallback,
    callOn (this),
)

ifOk__ (
    this.startupCallback,
    call (this),
)

ifOk__ (
    this.startupCallback,
    bind (this) >> call,
)

this.startupCallback
| ifOk (f => f.call (this))

'startupCallback'
| ifHasOn (this, call)

'startupCallback'
| ifBind (this, call)

invokeIfHas (this, 'startupCallback')
invoke1IfHas (this, 'startupCallback', 10)

ifBind (this, 'startupCallback', call)

*/


