# SampleApp

Create namespaces and add role for pulling images from the default namespace
```shell
oc new-project dev
oc new-project test
oc policy add-role-to-user system:image-puller system:serviceaccount:dev:default --namespace default
oc policy add-role-to-user system:image-puller system:serviceaccount:test:default --namespace default
```

Create an OpenShift BuildConfig
```shell
oc project default
oc new-build --strategy=docker https://github.com/jlmayorga/sample-app.git --name sample-app
```

Deploy Dev and Test applications
```shell
oc apply -k deployment/overlays/dev/
oc apply -k deployment/overlays/test/
```

Get the routes
```shell
oc -n dev get routes
oc -n test get routes
```
Launch a browser and open the route for the sample application
```shell
http://sample-app-<namespace>.apps.<cluster FQDN>
```






