import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, TrendingUp, AlertTriangle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface SEOAuditResult {
  url: string;
  title: string;
  description: string;
  titleLength: number;
  descriptionLength: number;
  hasCanonical: boolean;
  hasOgTags: boolean;
  hasStructuredData: boolean;
  score: number;
  issues: string[];
  recommendations: string[];
}

interface AuditSummary {
  timestamp: string;
  overallScore: number;
  totalPages: number;
  totalIssues: number;
  averageScore: number;
  status: string;
  pages: SEOAuditResult[];
}

export default function SEODashboard() {
  const [auditData, setAuditData] = useState<AuditSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchSEOAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo-audit');
      const data = await response.json();
      setAuditData(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Failed to fetch SEO audit:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOAudit();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  return (
    <>
      <Head>
        <title>SEO Dashboard - GoZupees Admin</title>
        <meta name="description" content="Monitor and optimize SEO performance across all GoZupees pages" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
                <p className="text-gray-600 mt-2">Monitor and optimize SEO performance across all pages</p>
              </div>
              <button
                onClick={fetchSEOAudit}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Audit
              </button>
            </div>
            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
            )}
          </div>

          {loading && !auditData ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Running SEO audit...</p>
            </div>
          ) : auditData ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Overall Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(auditData.overallScore).split(' ')[0]}`}>
                        {auditData.overallScore}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Search className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pages Audited</p>
                      <p className="text-2xl font-bold text-gray-900">{auditData.totalPages}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Issues</p>
                      <p className="text-2xl font-bold text-gray-900">{auditData.totalIssues}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <p className="text-lg font-bold text-gray-900">{auditData.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Details */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Page Analysis</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title Length
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description Length
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Technical SEO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issues
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditData.pages.map((page, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(page.score)}
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{page.url}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {page.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(page.score)}`}>
                              {page.score}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={page.titleLength < 30 || page.titleLength > 60 ? 'text-red-600' : 'text-green-600'}>
                              {page.titleLength}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={page.descriptionLength < 120 || page.descriptionLength > 160 ? 'text-red-600' : 'text-green-600'}>
                              {page.descriptionLength}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <span className={`w-3 h-3 rounded-full ${page.hasCanonical ? 'bg-green-400' : 'bg-red-400'}`} title="Canonical URL" />
                              <span className={`w-3 h-3 rounded-full ${page.hasOgTags ? 'bg-green-400' : 'bg-red-400'}`} title="Open Graph Tags" />
                              <span className={`w-3 h-3 rounded-full ${page.hasStructuredData ? 'bg-green-400' : 'bg-red-400'}`} title="Structured Data" />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {page.issues.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
                <div className="space-y-4">
                  {auditData.pages.map((page, index) => (
                    page.recommendations.length > 0 && (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <h3 className="font-medium text-gray-900">{page.url}</h3>
                        <ul className="mt-2 space-y-1">
                          {page.recommendations.map((rec, recIndex) => (
                            <li key={recIndex} className="text-sm text-gray-600">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-gray-600">Failed to load SEO audit data</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}