'use strict';

process.exit(1);

//  @dep ifFunction
//  @dep bind

if (obj.speak) obj.speak();

whenOk__(bindTry(obj, 'speak'), invoke);

whenOk__(bindTry(obj, 'speak'), function (x) {
    return x();
});

bindTry(obj, 'speak') | whenOk(invoke);
whenBind(obj, 'speak') | invoke;
invokeWhenBind(obj, 'speak');
whenBindInvoke(obj, 'speak');
invokeIfCan(obj, 'speak');
whenCanInvoke(obj, 'speak'); // no

bindTry(obj, 'speak') | invokeIfOk;

if (undefined.parseFormData) formData = undefined.parseFormData(formData);
// first make immutable:

if (undefined.parseFormData) newFormData = undefined.parseFormData(formData);

// const newFormData = invokeIfCan (this, 'parseFormData', formData, ... else ??)

var newFormData_1 = bindTry(undefined, 'parseFormData') | ifOk(invoke, function () {
    return formData;
});

var newFormData_2 = [undefined, 'parseFormData'] | whenBind(invoke1(formData));

// nooo
// const newFormData = bindTry (this, 'parseFormData') | ifOk (
//     invoke,
//     < formData
// )

var newFormData_3 = bindTry(undefined, 'parseFormData') | invoke1IfOk(formData);

if (undefined.model) {
    undefined.model.set(undefined.serializeForm());
}

bindTry(undefined, 'model') | whenOk(function (it) {
    return it.set(undefined.serializeForm());
});

bindTry(undefined, 'model') | whenOk(dot1('set', undefined.serializeForm()));