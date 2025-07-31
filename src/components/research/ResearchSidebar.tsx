import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const topicCategories = [
  { name: 'Physics', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { name: 'Computer Science', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { name: 'Biology', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { name: 'Mathematics', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { name: 'Chemistry', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  { name: 'Medicine', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' },
  { name: 'Engineering', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' },
  { name: 'Economics', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
];

const filterOptions = [
  { label: 'Recent Papers', icon: Clock, href: '/?filter=recent' },
  { label: 'Most Zapped', icon: TrendingUp, href: '/?filter=zapped' },
  { label: 'Highly Rated', icon: Star, href: '/?filter=rated' },
  { label: 'Most Discussed', icon: Users, href: '/?filter=discussed' },
];

export function ResearchSidebar() {
  return (
    <div className="space-y-6">
      {/* Filter Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filterOptions.map((option) => (
            <Button
              key={option.label}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link to={option.href}>
                <option.icon className="h-4 w-4 mr-2" />
                {option.label}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Research Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Research Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topicCategories.map((topic) => (
              <Link
                key={topic.name}
                to={`/topic/${topic.name.toLowerCase().replace(' ', '-')}`}
                className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${topic.color.split(' ')[0]}`} />
                <span className="text-sm font-medium">{topic.name}</span>
              </Link>
            ))}
          </div>
          <Separator className="my-4" />
          <Button variant="outline" size="sm" className="w-full">
            View All Topics
          </Button>
        </CardContent>
      </Card>



      {/* Anonymous Period Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Anonymous Period
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Authors remain anonymous for 3 months to prevent bias and encourage merit-based evaluation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}