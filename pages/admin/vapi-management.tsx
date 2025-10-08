import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Plus, Key, Bot, Trash2, Edit, Phone } from 'lucide-react';
import { VapiCredential, VapiAgent } from '../../shared/schema';

export default function VapiManagement() {
  const queryClient = useQueryClient();
  const [selectedCredential, setSelectedCredential] = useState<number | null>(null);
  const [testAgentName, setTestAgentName] = useState('');
  const [testPhoneNumber, setTestPhoneNumber] = useState('');

  // Fetch credentials
  const { data: credentials = [], isLoading: credentialsLoading } = useQuery<VapiCredential[]>({
    queryKey: ['/api/vapi/credentials'],
  });

  // Fetch agents
  const { data: agents = [], isLoading: agentsLoading } = useQuery<any[]>({
    queryKey: ['/api/vapi/agents'],
  });

  // Add credential mutation
  const addCredentialMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/vapi/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vapi/credentials'] });
    },
  });

  // Add agent mutation
  const addAgentMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/vapi/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vapi/agents'] });
    },
  });

  // Test call mutation
  const testCallMutation = useMutation({
    mutationFn: (data: { agentName: string; phoneNumber?: string }) => 
      fetch('/api/vapi/start-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
  });

  const handleAddCredential = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addCredentialMutation.mutate({
      name: formData.get('name'),
      publicKey: formData.get('publicKey'),
      privateKey: formData.get('privateKey') || null,
    });
    e.currentTarget.reset();
  };

  const handleAddAgent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addAgentMutation.mutate({
      name: formData.get('name'),
      agentId: formData.get('agentId'),
      description: formData.get('description'),
      credentialId: selectedCredential,
    });
    e.currentTarget.reset();
    setSelectedCredential(null);
  };

  const handleTestCall = () => {
    if (!testAgentName) return;
    testCallMutation.mutate({
      agentName: testAgentName,
      phoneNumber: testPhoneNumber || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">VAPI Developer Management</h1>
          <p className="text-gray-400">Store VAPI credentials and agent IDs so the developer doesn't hardcode them</p>
        </div>

        <Tabs defaultValue="credentials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="test">Test Calls</TabsTrigger>
            <TabsTrigger value="logs">Call Logs</TabsTrigger>
          </TabsList>

          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Add VAPI Credentials
                  </CardTitle>
                  <CardDescription>Store your VAPI API keys securely</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCredential} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Credential Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., Production, Development"
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="publicKey">Public Key</Label>
                      <Input
                        id="publicKey"
                        name="publicKey"
                        placeholder="Your VAPI public key"
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="privateKey">Private Key (Optional)</Label>
                      <Input
                        id="privateKey"
                        name="privateKey"
                        placeholder="Your VAPI private key for outbound calls"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={addCredentialMutation.isPending}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Credentials
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Stored Credentials</CardTitle>
                  <CardDescription>Your VAPI API credentials</CardDescription>
                </CardHeader>
                <CardContent>
                  {credentialsLoading ? (
                    <div>Loading...</div>
                  ) : credentials.length === 0 ? (
                    <p className="text-gray-400">No credentials stored yet</p>
                  ) : (
                    <div className="space-y-3">
                      {credentials.map((cred: VapiCredential) => (
                        <div key={cred.id} className="p-3 bg-gray-700 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{cred.name}</h4>
                              <p className="text-sm text-gray-400">
                                Public: {cred.publicKey.substring(0, 20)}...
                              </p>
                              {cred.privateKey && (
                                <Badge variant="secondary" className="mt-1">
                                  Has Private Key
                                </Badge>
                              )}
                            </div>
                            <Badge variant={cred.isActive ? "default" : "secondary"}>
                              {cred.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Add VAPI Agent
                  </CardTitle>
                  <CardDescription>Register a new VAPI agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddAgent} className="space-y-4">
                    <div>
                      <Label htmlFor="agentName">Agent Name</Label>
                      <Input
                        id="agentName"
                        name="name"
                        placeholder="e.g., Chloe, Zeno, Maya"
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="agentId">VAPI Agent ID</Label>
                      <Input
                        id="agentId"
                        name="agentId"
                        placeholder="Agent ID from VAPI dashboard"
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Agent description and capabilities"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="credential">VAPI Credentials</Label>
                      <Select 
                        value={selectedCredential?.toString() || ""} 
                        onValueChange={(value) => setSelectedCredential(parseInt(value))}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select credentials" />
                        </SelectTrigger>
                        <SelectContent>
                          {credentials.map((cred: VapiCredential) => (
                            <SelectItem key={cred.id} value={cred.id.toString()}>
                              {cred.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={addAgentMutation.isPending || !selectedCredential}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Agent
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Registered Agents</CardTitle>
                  <CardDescription>Your VAPI agents</CardDescription>
                </CardHeader>
                <CardContent>
                  {agentsLoading ? (
                    <div>Loading...</div>
                  ) : agents.length === 0 ? (
                    <p className="text-gray-400">No agents registered yet</p>
                  ) : (
                    <div className="space-y-3">
                      {agents.map((agent: any) => (
                        <div key={agent.id} className="p-3 bg-gray-700 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{agent.name}</h4>
                              <p className="text-sm text-gray-400">
                                ID: {agent.agentId}
                              </p>
                              <p className="text-sm text-blue-400">
                                Credential: {agent.credentialName}
                              </p>
                            </div>
                            <Badge variant={agent.isActive ? "default" : "secondary"}>
                              {agent.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Test Calls Tab */}
          <TabsContent value="test" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Test VAPI Integration
                </CardTitle>
                <CardDescription>Test web calls or phone calls with your agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="testAgent">Select Agent</Label>
                  <Select value={testAgentName} onValueChange={setTestAgentName}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Choose an agent to test" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent: any) => (
                        <SelectItem key={agent.id} value={agent.name}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testPhone">Phone Number (Optional)</Label>
                  <Input
                    id="testPhone"
                    value={testPhoneNumber}
                    onChange={(e) => setTestPhoneNumber(e.target.value)}
                    placeholder="Leave empty for web call, or enter phone for outbound call"
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <Button 
                  onClick={handleTestCall}
                  disabled={testCallMutation.isPending || !testAgentName}
                  className="w-full"
                >
                  {testCallMutation.isPending ? 'Testing...' : 'Test Integration'}
                </Button>
                
                {testCallMutation.data && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Test Result:</h4>
                    <pre className="text-sm text-green-400">
                      {JSON.stringify(testCallMutation.data, null, 2)}
                    </pre>
                  </div>
                )}
                
                {testCallMutation.error && (
                  <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-400">Error:</h4>
                    <p className="text-sm text-red-300">
                      {(testCallMutation.error as any)?.message || 'Test failed'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Call Logs Tab */}
          <TabsContent value="logs">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Call Logs</CardTitle>
                <CardDescription>Recent VAPI call activity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Call logs will appear here once you start making calls</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}