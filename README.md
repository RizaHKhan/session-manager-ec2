# Connecting to EC2 via Session Manager

A simple infrastructure where we can connect to an EC2 via session manager.

For connecting to an EC2 via Session Manager only requires configuration at the instance level.

We need to add a managed policy `AmazonSSMManagedInstanceCore`, and we also need to use an instance that has the ssm-agent installed.

Role:

```typescript
role: new Role(scope, "Role", {
  assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
  managedPolicies: [
    ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore"),
  ],
}),
```

Image:

```typescript
machineImage: new AmazonLinuxImage({
  generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
}),
```
